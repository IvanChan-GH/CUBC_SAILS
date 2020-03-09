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
      avatar:req.body.Boardgame.avatar,
      remark: req.body.Boardgame.remark,
      bookstatus:false,
      borrowstatus:false,
    });

    return res.ok ('Successfully created!');
  },
};
