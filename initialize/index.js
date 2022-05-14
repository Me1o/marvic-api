/**
 * Application initilization that will call the required main classes to run the app
 * @param {*} app - express app instance
 *
 */
module.exports = (app) => {
  require('./init.env');
  require('./init.routes')(app);
  require('./init.auth');
  require('./init.seed.database')(app);
  require('./init.cdn');
};