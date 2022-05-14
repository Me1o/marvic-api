const jsonParser = require('body-parser').json({ extended: true });
const makeCallback = require('marvic-api/helpers/make.callback');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const localStrategy = require('passport-local').Strategy;
const authenticate = require('marvic-api/helpers/authenticate');


const { models: { User } } = require('marvic-api/helpers/models');
/**
 * @namespace User
 */

/**
  *
  * @namespace User.Routes
  * @memberof! User
  */
const UserControllers = require('./controllers');


module.exports = function (app) {
 app.post('/signup',passport.authenticate('signup', { session: false }),
  async (req, res, next) => {
    await User.update({ name: req.query.name }, { where: { id: req.user.id } });
      res.json({
        message: 'Signup successful',
        user: req.user
      });
  
   
  }
);

app.post('/login',async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err) {
            return res.json({ err });
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'HereIsATokenCreatedByHosam');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

app.get('/get-current-user',authenticate, makeCallback(UserControllers.getCurrentUser));
};