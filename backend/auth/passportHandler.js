const passport = require("passport");
const passportLocal = require("passport-local");
const passportJwt = require("passport-jwt");
const User = require("../models/user.model");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() })
      .then((user) => {
        if (!user) {
          return done(undefined, false, {
            message: `Email ${email} not found.`,
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(undefined, user);
          }
          return done(undefined, false, {
            message: "Invalid email or password.",
          });
        });
      })
      .catch((err) => {
        return done(err);
      });
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
    },
    function (jwtToken, done) {
      User.findOne({ email: jwtToken.email })
        .then((user) => {
          if (!user) {
            return done(undefined, false);
          }
          return done(undefined, user, jwtToken);
        })
        .catch((err) => {
          return done(err, false);
        });
    }
  )
);
