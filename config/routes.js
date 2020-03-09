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
  'POST /user/logout': 'UserController.logout',

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
