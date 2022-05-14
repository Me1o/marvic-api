const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');
const authenticate = require('marvic-api/helpers/authenticate');

/**
 * @namespace Product
 */

/**
  *
  * @namespace Product.Routes
  * @memberof! Product
  */
const ProductControllers = require('./controllers');


module.exports = function (app) {

   app.get('/product/list',authenticate, jsonParser, makeCallback(ProductControllers.list));
   app.get('/product/get',authenticate, jsonParser, makeCallback(ProductControllers.getInfo));
   app.post('/product/createOrUpdate',authenticate, jsonParser, makeCallback(ProductControllers.createOrUpdate));

};