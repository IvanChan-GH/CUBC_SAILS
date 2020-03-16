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

  'GET /book/list': 'BookController.list',
  'GET /boardgame/list': 'BoardgameController.list',
  'GET /material/list': 'MaterialController.list',
  'GET /present/list': 'PresentController.list',
  'GET /items/list': 'USerController.list',

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

  'GET /user/:id/bookingboardgame': 'UserController.showbookingboardgame',
  'GET /user/:id/bookingbook': 'UserController.showbookingbook',
  'GET /user/:id/bookingmaterial': 'UserController.showbookingmaterial',
  
  'GET /boardgame/:id/bookby/history': 'BoardgameController.showbookinghist',
  'GET /user/:id/bookingboardgame/history': 'UserController.showbookingboardgamehist',
 
  'GET /boardgame/bookingdetail/:id': 'BoardgameController.bookingdetail',
  'GET /book/bookingdetail/:id': 'BookController.bookingdetail',
  'GET /material/bookingdetail/:id': 'MaterialController.bookingdetail',

  'POST /user/:id/addbooking/boardgame/:fk': 'BoardgameController.addbooking',
  'POST /user/:id/addbooking/book/:fk': 'BookController.addbooking',
  'POST /user/:id/addbooking/material/:fk': 'MaterialController.addbooking',

  'POST /user/:id/removebooking/boardgame/:fk': 'BoardgameController.removebooking',
  'POST /user/:id/removebooking/book/:fk': 'BookController.removebooking',
  'POST /user/:id/removebooking/material/:fk': 'MaterialController.removebooking',


  
  'GET /boardgame/:id/borrowby': 'BoardgameController.showborrower',
  'GET /book/:id/borrowby': 'BookController.showborrower',
  'GET /material/:id/borrowby': 'MaterialController.showborrower',

  'GET /user/:id/borrowboardgame': 'UserController.showborrowboardgame',
  'GET /user/:id/borrowbook': 'UserController.showborrowbook',
  'GET /user/:id/borrowmaterial': 'UserController.showborrowmaterial',

  'GET /boardgame/borrowdetail/:id': 'BoardgameController.borrowdetail',
  'GET /book/borrowdetail/:id': 'BookController.borrowdetail',
  'GET /material/borrowdetail/:id': 'MaterialController.borrowdetail',

  'POST /user/:id/addborrow/boardgame/:fk': 'BoardgameController.addborrow',
  'POST /user/:id/addborrow/book/:fk': 'BookController.addborrow',
  'POST /user/:id/addborrow/material/:fk': 'MaterialController.addborrow',

  'POST /user/:id/removeborrow/boardgame/:fk': 'BoardgameController.removeborrow',
  'POST /user/:id/removeborrow/book/:fk': 'BookController.removeborrow',
  'POST /user/:id/removeborrow/material/:fk': 'MaterialController.removeborrow',

  'GET /book/booklist/': 'BookController.showBookList',
  'GET /material/materiallist/': 'MaterialController.showMaterialList',
  'GET /present/presentlist/': 'PresentController.showPresentList',
  'GET /boardgame/boardgamelist/': 'BoardgameController.showBoardgameList',
  'GET /user/stafflist/': 'UserController.staffList',
  'GET /user/createstaff/': 'UserController.create',


  'POST /book/booklist/': 'BookController.showBookList',
  'POST /material/materiallist/': 'MaterialController.showMaterialList',
  'POST /present/presentlist/': 'PresentController.showPresentList',
  'POST /boardgame/boardgamelist/': 'BoardgameController.showBoardgameList',
  'POST /user/stafflist/': 'UserController.staffList',
  'POST /user/createstaff/': 'UserController.create',


  'GET /category/category': 'CategoryController.showCategory',
  'POST /category/category': 'CategoryController.showCategory',




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
