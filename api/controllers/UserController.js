/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  //user login
  login: async function (req, res) {
    if (req.method == 'GET') return res.view ('user/login');

    if (!req.body.username || !req.body.password) return res.badRequest ();

    var user = await User.findOne ({username: req.body.username});

    if (!user) return res.status (401).send ('User not found');

    const match = await sails.bcrypt.compare (req.body.password, user.password);

    if (!match) return res.status (401).send ('Wrong Password');

    req.session.regenerate (function (err) {
      if (err) return res.serverError (err);

      req.session.username = req.body.username;
      req.session.userId = user.id;
      req.session.role = user.role;
      console.log ('userid: ' + user.id);
      sails.log ('[Session] ', req.session);
      if (req.wantsJSON) {
        return res.json ({
          url: '/',
          message: 'Login successfully.',
          uid: user.id,
        }); // for ajax request
      } else {
        return res.redirect ('/'); // for normal request
      }
    });
  },
  //user logout
  logout: async function (req, res) {
    req.session.destroy (function (err) {
      if (err) return res.serverError (err);
      // return res.ok("Log out successfully.");
      console.log("logout now");
      console.log(req.session);
      return res.redirect ('/user/login');
    });
  },

  // upload user's image photo
  upload: async function (req, res) {
    if (req.method == 'GET') return res.view ('user/upload');

    console.log ('req.body.agree = ' + req.body.agree);
    console.log (req.session.username);
    await User.update (
      {username: req.session.username},
      {
        avatar: req.body.User.avatar,
      }
    );

    return res.ok ('File uploaded.');
  },

  //show booking boardgame
  showbookingboardgame: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('bookboardgame');

    if (!model) return res.notFound ();

    return res.json (model);
  },
  //show booking boardgamehistoryt
  showbookingboardgamehist: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('bookboardgamehist');

    if (!model) return res.notFound ();

    return res.json (model);
  },


  //show booking books
  showbookingbook: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('bookbook');

    if (!model) return res.notFound ();

    return res.json (model);
  },


  //show booking materials
  showbookingmaterial: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('bookmaterial');

    if (!model) return res.notFound ();

    return res.json (model);
  },


  //Search function
  search: async function (req, res) {
 
    var bgmodel;
    if (req.method == 'GET') return res.view ('user/search' , { boardgames: bgmodel });

    if (!req.body.keyword) return res.badRequest ('Form-data not received.');

    var word=req.body.keyword;
    var bgmodel = await Boardgame.find({
      where: { name: { contains: word } },
      sort: 'updatedAt DESC'
    });
  
    return res.view('user/search', { boardgames: bgmodel });
  },


};
