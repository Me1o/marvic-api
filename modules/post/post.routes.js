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
const PostControllers = require('./controllers');


module.exports = function (app) {

   app.get('/feed', jsonParser, makeCallback(PostControllers.feed));

};