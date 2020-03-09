/**
 * MaterialController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
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
};
