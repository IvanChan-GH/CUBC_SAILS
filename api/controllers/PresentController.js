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
};
