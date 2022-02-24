const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const { models: { User } } = require('marvic-api/helpers/models');

passport.use('signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.create({ email, password });
          return done(null, user);
        } catch (error) {
          return done('0');
        }
      }
    )
  );



passport.use('login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email: email } });
          if (!user) {
            return done({ code: '1', message: 'User not found' }, false, { message: 'User not found' });
          }
  
          const validate = await user.validPassword(password);
          if (!validate) {
            return done({  code: '2', message: 'Wrong Password' }, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  