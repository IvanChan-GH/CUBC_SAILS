/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    //user login
    login: async function (req, res) {

        if (req.method == "GET") return res.view('user/login');

        if (!req.body.username || !req.body.password) return res.badRequest();

        var user = await User.findOne({ username: req.body.username });

        if (!user) return res.status(401).send("User not found");

        const match = await sails.bcrypt.compare(req.body.password, user.password);

        if (!match) return res.status(401).send("Wrong Password");

        req.session.regenerate(function (err) {

            if (err) return res.serverError(err);

            req.session.username = req.body.username;
            req.session.userId = user.id;
            req.session.role = user.role;
            console.log("userid: "+ user.id);
            sails.log("[Session] ", req.session);
            if (req.wantsJSON){
                return res.json({url:'/', message: 'Login successfully.', uid: user.id});   // for ajax request
            } else {
                return res.redirect('/');           // for normal request
            }
    
        });
    },
    //user logout
    logout: async function (req, res) {

        req.session.destroy(function (err) {

            if (err) return res.serverError(err);
            // return res.ok("Log out successfully.");
            return res.redirect('/'); 
        });
    },

    // upload user's image photo
    upload: async function(req, res) {

        if (req.method == 'GET')
            return res.view('user/upload');
    
        console.log('req.body.agree = ' + req.body.agree);
    
        await User.update({username: req.session.username}, {
            avatar: req.body.User.avatar
        });
        
        return res.ok('File uploaded.');
    },

};

