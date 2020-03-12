/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': '/user/login',
  'GET /user/login': 'UserController.login',
  'POST /user/login': 'UserController.login',
  'GET /user/logout': 'UserController.logout',
  'POST /user/logout': 'UserController.logout',

  'GET /user/search': 'UserController.search',
  'POST /user/search': 'UserController.search',

  '/user/upload': 'UserController.upload',
  'GET /user/:username/avatar.jpg': 'UserController.avatar',

  'GET /book/view/:id': 'BookController.viewdetails',
  'GET /boardgame/view/:id': 'BoardgameController.viewdetails',
  'GET /material/view/:id': 'MaterialController.viewdetails',
  'GET /present/view/:id': 'PresentController.viewdetails',

  'GET /boardgame/create': 'BoardgameController.create',
  'POST /boardgame/create': 'BoardgameController.create',
  'GET /book/create': 'BookController.create',
  'POST /book/create': 'BookController.create',
  'GET /present/create': 'PresentController.create',
  'POST /present/create': 'PresentController.create',
  'GET /material/create': 'MaterialController.create',
  'POST /material/create': 'MaterialController.create',

  'GET /boardgame/update/:id': 'BoardgameController.update',
  'POST /boardgame/update/:id': 'BoardgameController.update',
  'GET /book/update/:id': 'BookController.update',
  'POST /book/update/:id': 'BookController.update',
  'GET /present/update/:id': 'PresentController.update',
  'POST /present/update/:id': 'PresentController.update',
  'GET /material/update/:id': 'MaterialController.update',
  'POST /material/update/:id': 'MaterialController.update',

  'GET /boardgame/:id/bookby': 'BoardgameController.showbooking',
  'GET /book/:id/bookby': 'BookController.showbooking',
  'GET /material/:id/bookby': 'MaterialController.showbooking',
  'GET /present/:id/bookby': 'PresentController.showbooking',
  'GET /user/:id/bookingboardgame': 'UserController.showbookingboardgame',
  'GET /user/:id/bookingbook': 'UserController.showbookingbook',
  'GET /user/:id/bookingmaterial': 'UserController.showbookingmaterial',
  'GET /user/:id/bookingpresent': 'UserController.showbookingpresent',

  'GET /boardgame/:id/bookby/history': 'BoardgameController.showbookinghist',
  // 'GET /book/:id/bookby/history': 'BookController.showbookinghist',
  // 'GET /material/:id/bookby/history': 'MaterialController.showbookinghist',
  // 'GET /present/:id/bookby/history': 'PresentController.showbookinghist',
  'GET /user/:id/bookingboardgame/history': 'UserController.showbookingboardgamehist',
  // 'GET /user/:id/bookingbook/history': 'UserController.showbookingbookhist',
  // 'GET /user/:id/bookingmaterial/history': 'UserController.showbookingmaterialhist',
  // 'GET /user/:id/bookingpresent/history': 'UserController.showbookingpresenthist',

  'GET /boardgame/bookingdetail/:id': 'BoardgameController.bookingdetail',
  'GET /book/bookingdetail/:id': 'BookController.bookingdetail',
  'GET /material/bookingdetail/:id': 'MaterialController.bookingdetail',
  

  'POST /user/:id/addbooking/boardgame/:fk': 'BoardgameController.addbooking',
  'POST /user/:id/addbooking/book/:fk': 'BookController.addbooking',
  'POST /user/:id/addbooking/material/:fk': 'MaterialController.addbooking',


  'POST /user/:id/removebooking/boardgame/:fk': 'BoardgameController.removebooking',
  'POST /user/:id/removebooking/book/:fk': 'BookController.removebooking',
  'POST /user/:id/removebooking/material/:fk': 'MaterialController.removebooking',

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
};
