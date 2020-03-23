/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

   //list all models
   list: async function (req, res) {
    var boardgames = await Boardgame.find ();
    var books = await Book.find ();
    var materials = await Material.find ();
    var presents = await Present.find ();
    return res.json ({boardgames: boardgames, books: books, materials: materials, presents: presents });
    return res.view ('user/list', {boardgames: models,books:models2 ,materials:models3 ,presents:models4});
  },

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
        return res.json({uid: user.id ,role: user.role ,message:"login successfully"});
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


  //show borrowed boardgame
  showborrowboardgame: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('borrowboardgame');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  //show borrowed book
  showborrowbook: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('borrowbook');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  //show borrowed activity material
  showborrowmaterial: async function (req, res) {
    var model = await User.findOne (req.params.id).populate ('borrowmaterial');

    if (!model) return res.notFound ();

    return res.json (model);
  },

  //Search function
  search: async function (req, res) {
 
    
    if (req.method == 'GET') return res.view ('user/search' , { boardgames: null , books: null , materials: null, presents: null});

    if (!req.body.keyword) return res.badRequest ('Form-data not received.');

    var word=req.body.keyword;
    var bgmodel = await Boardgame.find({
      where: { name: { contains: word } },
      sort: 'updatedAt DESC'
    });

    var bkmodel = await Book.find({
      where: { name: { contains: word } },
      sort: 'updatedAt DESC'
    });

    var matmodel = await Material.find({
      where: { name: { contains: word } },
      sort: 'updatedAt DESC'
    });
  
    var presentmodel = await Present.find({
      where: { name: { contains: word } },
      sort: 'updatedAt DESC'
    });

    return res.view('user/search', { boardgames: bgmodel ,books: bkmodel ,materials: matmodel, presents: presentmodel});
  },

  staffList: async function (req,res){
    var model = await User.find({
      where: {role: {"contains": "staff"}}
    });
    console.log(model)

    return res.json({User: model
    });

    // return res.view ('user/stafflist', {User: model});


  },

  create: async function(req, res){

    if (req.method == 'GET') return res.view ('user/create');

    if (!req.body.User) return res.badRequest ('Form-data not received.');
    console.log(req.body);
    console.log(req.body.User.username);
    const saltRounds = 10;
    const pw=await sails.bcrypt.hash (req.body.User.password, saltRounds);
    await User.create ({
      username: req.body.User.username,
      staffID: req.body.User.id,
      password: pw,
      role: "staff",
      avatar: req.body.User.avatar,
      staffID: req.body.User.staffID,
      email: req.body.User.email,
      tel: req.body.User.tel
     
      
    });

    return res.ok ('Successfully created!');

  },

  staffdetail: async function (req, res) {
    var model = await User.findOne (req.params.id);

    if (!model) return res.notFound ();
    return res.json({user: model});

    // return res.view ('user/staffdetail/', {user: model});
  },

  update: async function (req, res) {
    if (req.method == 'GET') {
      var model = await User.findOne (req.params.id);

      if (!model) return res.notFound ();
      return res.json({user: model});

      // return res.view ('user/update', {User: model});
    } else {
      if (!req.body) return res.badRequest ('Form-data not received.');

      var models = await User.update (req.params.id)
        .set ({
          username: req.body.username,
          staffID: req.body.id,
          role: "staff",
          avatar: req.body.avatar,
          staffID: req.body.staffID,
          email: req.body.email,
          tel: req.body.tel
     
        })
        .fetch ();

      if (models.length == 0) return res.notFound ();
      return res.json({user: model})

      return res.ok ('Record updated');
    }
  },

// action - delete
delete: async function (req, res) {
  if (req.method == "GET") return res.forbidden();
  var model = await Estate.destroy(req.params.id).fetch();
  if (model.length == 0) return res.notFound();

  //return res.ok("Staff Deleted.");
  if (req.wantsJSON) {
      return res.json({ message: "Staff Deleted.", url: '/user/staffList' }); // for ajax request
  } else {
      return res.redirect('/user/staffListn'); // for normal request
  }
},

};
