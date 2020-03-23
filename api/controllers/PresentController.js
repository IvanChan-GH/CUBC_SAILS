/**
 * PresentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   //list boardgame model
   list: async function (req, res) {
    var models = await Present.find ();
    return res.view ('present/list', {presents: models});
  },

  //return item details
  viewdetails: async function (req, res) {
    var model = await Present.findOne (req.params.id);

    if (!model) return res.notFound ();

    return res.view ('present/viewdetails', {present: model});
  },
  //create item in db
  create: async function (req, res) {
    if (req.method == 'GET') return res.view ('present/create');

    if (!req.body.Present) return res.badRequest ('Form-data not received.');

    await Present.create ({
      name: req.body.Present.name,
      size: req.body.Present.size,
      price: req.body.Present.price,
      quantity: req.body.Present.quantity,
      location: req.body.Present.location,
      avatar: req.body.Present.avatar,
      remark: req.body.Present.remark,
    });

    return res.ok ('Successfully created!');
  },

  // update item info.
  update: async function (req, res) {
    if (req.method == 'GET') {
      var model = await Present.findOne (req.params.id);

      if (!model) return res.notFound ();

      return res.view ('present/update', {present: model});
    } else {
      if (!req.body.Present) return res.badRequest ('Form-data not received.');

      var models = await Present.update (req.params.id)
        .set ({
          name: req.body.Present.name,
          size: req.body.Present.size,
          price: req.body.Present.price,
          quantity: req.body.Present.quantity,
          location: req.body.Present.location,
          avatar: req.body.Present.avatar,
          remark: req.body.Present.remark,
        })
        .fetch ();

      if (models.length == 0) return res.notFound ();

      return res.ok ('Record updated');
    }
  },

  showPresentList: async function (req, res) {

  
    var model = await Present.find();
    console.log(model)

    return res.view ('present/presentlist', {Present: model});
  },

  // action - delete
delete: async function (req, res) {
  if (req.method == "GET") return res.forbidden();
  var model = await Present.destroy(req.params.id).fetch();
  if (model.length == 0) return res.notFound();

  //return res.ok("Staff Deleted.");
  if (req.wantsJSON) {
      return res.json({ message: "Present Deleted.", url: '/present/presentlist' }); // for ajax request
  } else {
      return res.redirect('/present/presentlist'); // for normal request
  }
},
};
