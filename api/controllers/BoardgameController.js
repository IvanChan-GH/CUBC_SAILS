/**
 * BoardgameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //return item details
    viewdetails: async function (req, res) {

        var model = await Boardgame.findOne(req.params.id);
    
        if (!model) return res.notFound();
    
        return res.view('boardgame/viewdetails', { boardgame: model });
    
    },

};

