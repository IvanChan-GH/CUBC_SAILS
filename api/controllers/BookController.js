/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //return item details
  viewdetails: async function (req, res) {
    var model = await Book.findOne (req.params.id);

    if (!model) return res.notFound ();

    return res.view ('book/viewdetails', {book: model});
  },

  //create item in db
  create: async function (req, res) {
    if (req.method == 'GET') return res.view ('book/create');

    if (!req.body.Book) return res.badRequest ('Form-data not received.');

    await Book.create ({
      name: req.body.Book.name,
      author: req.body.Book.author,
      pubyear: req.body.Book.pubyear,
      location: req.body.Book.location,
      avatar: req.body.Book.avatar,
      remark: req.body.Book.remark,
      bookstatus: false,
      borrowstatus: false,
    });

    return res.ok ('Successfully created!');
  },

  // update item info.
  update: async function (req, res) {
    if (req.method == 'GET') {
      var model = await Book.findOne (req.params.id);

      if (!model) return res.notFound ();

      return res.view ('book/update', {book: model});
    } else {
      if (!req.body.Book) return res.badRequest ('Form-data not received.');

      var models = await Book.update (req.params.id)
        .set ({
          name: req.body.Book.name,
          author: req.body.Book.author,
          pubyear: req.body.Book.pubyear,
          location: req.body.Book.location,
          avatar: req.body.Book.avatar,
          remark: req.body.Book.remark,
        })
        .fetch ();

      if (models.length == 0) return res.notFound ();

      return res.ok ('Record updated');
    }
  },

  // add booking association
  addbooking: async function (req, res) {
    if (!await Book.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookbook', {
      id: req.params.fk,
    });
    console.log ('fk:' + req.params.fk);
    console.log ('id:' + req.params.id);
    console.log (thatPerson);
    if (!thatPerson) return res.notFound ();

    if (thatPerson.bookbook.length)
      return res.status (409).send ('Already booked.'); // conflict

    await Book.addToCollection (req.params.fk, 'bkbookby').members (
      req.params.id
    );
    await User.addToCollection (req.params.id, 'bookbook').members (
      req.params.fk
    );

    await Book.update (req.params.fk)
      .set ({
        bookstatus: true,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'booking successfully',
        url: '/book/viewdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/viewdetail/' + req.params.fk); // for normal request
    }
  },

  //remove booking association
  removebooking: async function (req, res) {
    if (!await Book.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookbook', {
      id: req.params.fk,
    });

    if (!thatPerson) return res.notFound ();

    if (!thatPerson.bookbook.length)
      return res.status (409).send ('Nothing to delete.'); // conflict

    await Book.removeFromCollection (req.params.fk, 'bkbookby').members (
      req.params.id
    );
    await User.removeFromCollection (req.params.id, 'bookbook').members (
      req.params.fk
    );

    await Book.update (req.params.fk)
      .set ({
        bookstatus: false,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'cancle booking successfully',
        url: '/book/viewdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/viewdetail/' + req.params.fk); // for normal request
    }
  },

  //show borrowers
  showbooking: async function (req, res) {
    var model = await Book.findOne (req.params.id).populate ('bkbookby');

    if (!model) return res.notFound ();

    return res.json (model);
  },

 
  // action - view book detail
  viewdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Book.findOne (req.params.id).populate ('bkbookby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('book/booking', {
      book: model,
      isbooked: model.bookstatus,
    });
  },
};
