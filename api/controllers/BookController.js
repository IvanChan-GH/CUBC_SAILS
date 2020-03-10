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
      if (!req.body.Book)
        return res.badRequest ('Form-data not received.');

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
};
