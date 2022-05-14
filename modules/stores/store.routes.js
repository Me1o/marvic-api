const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');
const authenticate = require('marvic-api/helpers/authenticate');

/**
 * @namespace Store
 */

/**
  *
  * @namespace Store.Routes
  * @memberof! Store
  */
const StoreControllers = require('./controllers');


module.exports = function (app) {

   app.get('/store/get',authenticate, jsonParser, makeCallback(StoreControllers.getInfo));
   app.post('/store/createOrUpdate',authenticate, jsonParser, makeCallback(StoreControllers.createOrUpdate));

};