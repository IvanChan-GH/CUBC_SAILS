/**
 * PresentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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
      avatar:req.body.Present.avatar,
      remark: req.body.Present.remark,
  
    });

    return res.ok ('Successfully created!');
  },
};
