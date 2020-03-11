/**
 * BoardgameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //return item details
  viewdetails: async function (req, res) {
    var model = await Boardgame.findOne (req.params.id);

    if (!model) return res.notFound ();

    return res.view ('boardgame/viewdetails', {boardgame: model});
  },

  //create item in db
  create: async function (req, res) {
    if (req.method == 'GET') return res.view ('boardgame/create');

    if (!req.body.Boardgame) return res.badRequest ('Form-data not received.');

    await Boardgame.create ({
      name: req.body.Boardgame.name,
      type: req.body.Boardgame.type,
      location: req.body.Boardgame.location,
      avatar: req.body.Boardgame.avatar,
      remark: req.body.Boardgame.remark,
      bookstatus: false,
      borrowstatus: false,
    });

    return res.ok ('Successfully created!');
  },

  // update item info.
  update: async function (req, res) {
    if (req.method == 'GET') {
      var model = await Boardgame.findOne (req.params.id);

      if (!model) return res.notFound ();

      return res.view ('boardgame/update', {boardgame: model});
    } else {
      if (!req.body.Boardgame)
        return res.badRequest ('Form-data not received.');

      var models = await Boardgame.update (req.params.id)
        .set ({
          name: req.body.Boardgame.name,
          type: req.body.Boardgame.type,
          location: req.body.Boardgame.location,
          avatar: req.body.Boardgame.avatar,
          remark: req.body.Boardgame.remark,
        })
        .fetch ();

      if (models.length == 0) return res.notFound ();

      return res.ok ('Record updated');
    }
  },

  // add booking association
  addbooking: async function (req, res) {
    if (!await Boardgame.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookboardgame', {
      id: req.params.fk,
    });
    console.log ('fk:' + req.params.fk);
    console.log ('id:' + req.params.id);
    console.log (thatPerson);
    if (!thatPerson) return res.notFound ();

    if (thatPerson.bookboardgame.length)
      return res.status (409).send ('Already booked.'); // conflict

    await Boardgame.addToCollection (req.params.fk, 'bgbookby').members (
      req.params.id
    );
    await User.addToCollection (req.params.id, 'bookboardgame').members (
      req.params.fk
    );

    await Boardgame.addToCollection (req.params.fk, 'bgbookbyhist').members (
      req.params.id
    );
    await User.addToCollection (req.params.id, 'bookboardgamehist').members (
      req.params.fk
    );

    await Boardgame.update (req.params.fk)
      .set ({
        bookstatus: true,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'booking successfully',
        url: '/boardgame/viewdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/boardgame/viewdetail/' + req.params.fk); // for normal request
    }
  },

  //remove booking association
  removebooking: async function (req, res) {
    if (!await Boardgame.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookboardgame', {
      id: req.params.fk,
    });

    if (!thatPerson) return res.notFound ();

    if (!thatPerson.bookboardgame.length)
      return res.status (409).send ('Nothing to delete.'); // conflict

    await Boardgame.removeFromCollection (req.params.fk, 'bgbookby').members (
      req.params.id
    );
    await User.removeFromCollection (req.params.id, 'bookboardgame').members (
      req.params.fk
    );

    await Boardgame.update (req.params.fk)
      .set ({
        bookstatus: false,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'cancle booking successfully',
        url: '/boardgame/viewdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/boardgame/viewdetail/' + req.params.fk); // for normal request
    }
  },

  //show borrowers
  showbooking: async function (req, res) {
    var model = await Boardgame.findOne (req.params.id).populate ('bgbookby');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  //show borrowers history
  showbookinghist: async function (req, res) {
    var model = await Boardgame.findOne (req.params.id).populate (
      'bgbookbyhist'
    );

    if (!model) return res.notFound ();

    return res.json (model);
  },

  // action - view boardgame detail
  viewdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Boardgame.findOne (req.params.id).populate ('bgbookby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('boardgame/booking', {
      boardgame: model,
      isbooked: model.bookstatus,
    });
  },
};
