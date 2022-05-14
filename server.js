const app = require('express')();
var cors = require('cors')
const passport = require("passport");

app.use(cors())
require('./initialize')(app);
const { sequelize } = require('marvic-api/helpers/models');
const port =  process.env.PORT;

//=== 3 - INITIALIZE PASSPORT MIDDLEWARE
app.use(passport.initialize());
require("marvic-api/helpers/jwt")(passport);

sequelize.sync()
  .then(() => {
    const server = app.listen(port, () => console.log(`App is running!`));
    process.on('SIGINT', () => server.close(() => process.exit(0)));
  });
module.exports = app;