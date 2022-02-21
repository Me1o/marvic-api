const glob = require('glob');
const path = require('path');

module.exports = function (app) {
  const routes = glob.sync('./modules/**/*.routes.js');
  routes.forEach(route => {
    require(path.resolve(route))(app);
  });
  app.use(fourOFour);
};




function fourOFour (req, res, next) {
  res.status(404);
 

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  // default to plain-text. send()
  res.type('txt').send('Not found');
  return;
}