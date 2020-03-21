/**
 * BookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //list book model
  list: async function (req, res) {
    var models = await Book.find ();
    return res.view ('book/list', {books: models});
  },

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
      isbooked: false,
      isborrowed: false,
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
        isbooked: true,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'booking successfully',
        url: '/book/bookingdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/bookingdetail/' + req.params.fk); // for normal request
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
        isbooked: false,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'cancle booking successfully',
        url: '/book/bookingdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/bookingdetail/' + req.params.fk); // for normal request
    }
  },

  //show booking user
  showbooking: async function (req, res) {
    var model = await Book.findOne (req.params.id).populate ('bkbookby');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  // action - view book detail
  bookingdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Book.findOne (req.params.id).populate ('bkbookby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('book/booking', {
      book: model,
      isbooked: model.isbooked,
    });
  },

  // action - borrow detail page
  borrowdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Book.findOne (req.params.id).populate ('bkborrowby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('book/borrow', {
      book: model,
      isborrowed: model.isborrowed,
    });
  },

  // add borrow association
  addborrow: async function (req, res) {
    if (!await Book.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('borrowbook', {
      id: req.params.fk,
    });

    if (!thatPerson) return res.notFound ();

    if (thatPerson.borrowbook.length)
      return res.status (409).send ('Already borrowed.'); // conflict

    await Book.addToCollection (req.params.fk, 'bkborrowby').members (
      req.params.id
    );
    await User.addToCollection (req.params.id, 'borrowbook').members (
      req.params.fk
    );
    
    var someDate = new Date();
    var numberOfDaysToAdd = 30;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 

    await Book.update (req.params.fk)
      .set ({
        isborrowed: true,
        duedate:someDate,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'borrow successfully',
        url: '/book/borrowdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/borrowdetail/' + req.params.fk); // for normal request
    }
  },

  //remove borrow association
  removeborrow: async function (req, res) {
    if (!await Book.findOne (req.params.fk)) return res.notFound ();

    const thatPerson = await User.findOne (
      req.params.id
    ).populate ('borrowbook', {
      id: req.params.fk,
    });

    if (!thatPerson) return res.notFound ();

    if (!thatPerson.borrowbook.length)
      return res.status (409).send ('Nothing to delete.'); // conflict

    await Book.removeFromCollection (req.params.fk, 'bkborrowby').members (
      req.params.id
    );
    await User.removeFromCollection (req.params.id, 'borrowbook').members (
      req.params.fk
    );

    await Book.update (req.params.fk)
      .set ({
        isborrowed: false,
        isbooked: false,
      })
      .fetch ();

    if (req.wantsJSON) {
      return res.json ({
        message: 'cancle borrow successfully',
        url: '/book/borrowdetail/' + req.params.fk,
      }); // for ajax request
    } else {
      return res.redirect ('/book/borrowdetail/' + req.params.fk); // for normal request
    }
  },

  // action - borrow detail page
  borrowdetail: async function (req, res) {
    // console.log('req id: ',req.params.id);
    var model = await Book.findOne (req.params.id).populate ('bkborrowby');
    if (!model) return res.notFound ();
    console.log (model);

    return res.view ('book/borrow', {
      book: model,
      isborrowed: model.isborrowed,
    });
  },

  //show borrower
  showborrower: async function (req, res) {
    var model = await Book.findOne (req.params.id).populate ('bkborrowby');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  showBookList: async function (req, res) {
    var model = await Book.find ();
    console.log (model);

    return res.view ('book/booklist', {book: model});
  },
};
