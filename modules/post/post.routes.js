const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');

/**
 * @namespace Post
 */

/**
  *
  * @namespace Post.Routes
  * @memberof! Post
  */
const SearchControllers = require('./controllers');


module.exports = function (app) {

  // app.post('/search', jsonParser, makeCallback(SearchControllers.search));

};