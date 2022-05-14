const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');
const authenticate = require('marvic-api/helpers/authenticate');

/**
 * @namespace Category
 */

/**
  *
  * @namespace Category.Routes
  * @memberof! Category
  */
const CategoryControllers = require('./controllers');


module.exports = function (app) {

   app.get('/category/list', authenticate, jsonParser, makeCallback(CategoryControllers.list));
   app.post('/category/create', authenticate, jsonParser, makeCallback(CategoryControllers.create));

};