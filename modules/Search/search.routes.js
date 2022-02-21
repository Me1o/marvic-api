const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');

/**
 * @namespace Search
 */

/**
  *
  * @namespace Search.Routes
  * @memberof! Search
  */
const SearchControllers = require('./controllers');


module.exports = function (app) {

   app.post('/search', jsonParser, makeCallback(SearchControllers.search));

};