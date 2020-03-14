/**
 * MaterialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //list materials model
  list: async function (req, res) {
    var models = await Material.find ();
    return res.view ('material/list', {materials: models});
  },

  //return item details
  viewdetails: async function (req, res) {
    var model = await Material.findOne (req.params.id);

    if (!model) return res.notFound ();

    return res.view ('material/viewdetails', {mat: model});
  },

  //create item in db
  create: async function (req, res) {
    if (req.method == 'GET') return res.view ('material/create');

    if (!req.body.Material) return res.badRequest ('Form-data not received.');

    await Material.create ({
      name: req.body.Material.name,
      returnback: req.body.Material.returnback,
      quantity: req.body.Material.quantity,
      location: req.body.Material.location,
      avatar: req.body.Material.avatar,
      remark: req.body.Material.remark,
      bookstatus: false,
      borrowstatus: false,
    });

    return res.ok ('Successfully created!');
  },

  // update item info.
  update: async function (req, res) {
    if (req.method == 'GET') {
      var model = await Material.findOne (req.params.id);

      if (!model) return res.notFound ();

      return res.view ('material/update', {material: model});
    } else {
      if (!req.body.Material) return res.badRequest ('Form-data not received.');

      var models = await Material.update (req.params.id)
        .set ({
          name: req.body.Material.name,
          returnback: req.body.Material.returnback,
          quantity: req.body.Material.quantity,
          location: req.body.Material.location,
          avatar: req.body.Material.avatar,
          remark: req.body.Material.remark,
        })
        .fetch ();

      if (models.length == 0) return res.notFound ();

      return res.ok ('Record updated');
    }
  },

  // add booking association
  addbooking: async function (req, res) {
    if (!await Material.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookmaterial', {
      id: req.params.fk,
    });
    console.log ('fk:' + req.params.fk);
    console.log ('id:' + req.params.id);
    console.log (thatPerson);
    if (!thatPerson) return res.notFound ();

    if (thatPerson.bookmaterial.length)
      return res.status (409).send ('Already booked.'); // conflict

    await Material.addToCollection (req.params.fk, 'matbookby').members (
      req.params.id
    );
    await User.addToCollection (req.params.id, 'bookmaterial').members (
      req.params.fk
    );

    await Material.update (req.params.fk)
      .set ({
        bookstatus: true,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'booking successfully',
        url: '/material/bookingdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/material/bookingdetail/' + req.params.fk); // for normal request
    }
  },

  //remove booking association
  removebooking: async function (req, res) {
    if (!await Material.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('bookmaterial', {
      id: req.params.fk,
    });

    if (!thatPerson) return res.notFound ();

    if (!thatPerson.bookmaterial.length)
      return res.status (409).send ('Nothing to delete.'); // conflict

    await Material.removeFromCollection (req.params.fk, 'matbookby').members (
      req.params.id
    );
    await User.removeFromCollection (req.params.id, 'bookmaterial').members (
      req.params.fk
    );

    await Material.update (req.params.fk)
      .set ({
        bookstatus: false,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'cancle booking successfully',
        url: '/material/bookingdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/material/bookingdetail/' + req.params.fk); // for normal request
    }
  },

  //show borrowers
  showbooking: async function (req, res) {
    var model = await Material.findOne (req.params.id).populate ('matbookby');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  // action - view book detail
  bookingdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Material.findOne (req.params.id).populate ('matbookby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('material/booking', {
      material: model,
      isbooked: model.bookstatus,
    });
  },

  // action - borrow detail page
  borrowdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Boardgame.findOne (req.params.id).populate ('bgborrowby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('boardgame/borrow', {
      boardgame: model,
      isborrowed: model.borrowstatus,
    });
  },

 // add borrow association
 addborrow: async function (req, res) {
  if (!await Material.findOne (req.params.fk)) return res.notFound ();

  const thatPerson = await User.findOne (
    req.params.id
  ).populate ('borrowmaterial', {
    id: req.params.fk,
  });
  console.log ('fk:' + req.params.fk);
  console.log ('id:' + req.params.id);
  console.log (thatPerson);
  if (!thatPerson) return res.notFound ();

  if (thatPerson.borrowmaterial.length)
    return res.status (409).send ('Already borrowed.'); // conflict

  await Material.addToCollection (req.params.fk, 'matborrowby').members (
    req.params.id
  );
  await User.addToCollection (req.params.id, 'borrowmaterial').members (
    req.params.fk
  );

  await Material.update (req.params.fk)
    .set ({
      borrowstatus: true,
    })
    .fetch ();

  if (req.wantsJSON) {
    return res.json ({
      message: 'borrow successfully',
      url: '/material/borrowdetail/' + req.params.fk,
    }); // for ajax request
  } else {
    return res.redirect ('/material/borrowdetail/' + req.params.fk); // for normal request
  }
},

//remove borrow association
removeborrow: async function (req, res) {
  if (!await Material.findOne (req.params.fk)) return res.notFound ();

  const thatPerson = await User.findOne (
    req.params.id
  ).populate ('borrowmaterial', {
    id: req.params.fk,
  });

  if (!thatPerson) return res.notFound ();

  if (!thatPerson.borrowmaterial.length)
    return res.status (409).send ('Nothing to delete.'); // conflict

  await Material.removeFromCollection (req.params.fk, 'matborrowby').members (
    req.params.id
  );
  await User.removeFromCollection (req.params.id, 'borrowmaterial').members (
    req.params.fk
  );

  await Material.update (req.params.fk)
    .set ({
      borrowstatus: false,
      bookstatus: false,
    })
    .fetch ();

  if (req.wantsJSON) {
    return res.json ({
      message: 'cancle borrow successfully',
      url: '/material/borrowdetail/' + req.params.fk,
    }); // for ajax request
  } else {
    return res.redirect ('/material/borrowdetail/' + req.params.fk); // for normal request
  }
},

// action - borrow detail page
borrowdetail: async function (req, res) {
  // console.log('req id: ',req.params.id);
  var model = await Material.findOne (req.params.id).populate ('matborrowby');
  if (!model) return res.notFound ();
  console.log (model);

  return res.view ('material/borrow', {
    material: model,
    isborrowed: model.borrowstatus,
  });
},

//show borrower
showborrower: async function (req, res) {
  var model = await Material.findOne (req.params.id).populate ('matborrowby');

  if (!model) return res.notFound ();

  return res.json (model);
},
showMaterialList: async function (req, res) {

  
  var model = await Material.find();
  console.log(model)

  return res.view ('material/materiallist', {Material: model});
},
};
