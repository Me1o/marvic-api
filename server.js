const app = require('express')();


require('./initialize')(app);
const { sequelize } = require('marvic-api/helpers/models');
const port = 4000;
sequelize.sync()
  .then(() => {
    const server = app.listen(port, () => console.log(`App is running!`));
    process.on('SIGINT', () => server.close(() => process.exit(0)));
  });
module.exports = app;