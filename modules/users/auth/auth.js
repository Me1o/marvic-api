const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const {
  models: { User },
} = require("marvic-api/helpers/models");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        email = email.toLowerCase();
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        return done(null, 0);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email: email.toLowerCase() },
        });
        if (!user) {
          return done({ code: "1", message: "User not found" }, false, {
            message: "User not found",
          });
        }

        const validate = await user.validPassword(password);
        if (!validate) {
          return done({ code: "2", message: "Wrong Password" }, false, {
            message: "Wrong Password",
          });
        }

        const today = new Date();
        const validTillDate = new Date(user.validTill);
        if (user.validTill == null) {
          return done({ code: "4", message: "new user" }, false, {
            message: "new user",
          });
        }

        const isValidPackage = validTillDate > today;
        if (!isValidPackage) {
          return done({ code: "3", message: "Package expired" }, false, {
            message: "Package expired",
          });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (error) {
        return done(error);
      }
    }
  )
);
