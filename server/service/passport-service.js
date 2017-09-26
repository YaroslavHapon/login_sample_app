const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('./../model/user-model');
const passport = require('passport');
const config = require('./../config');

const localOptions = { usernameField: 'email' }; // look at email field of the request body credentials

const localLogin = new LocalStrategy(localOptions, function (email, password, done) {
  User.findOne({ email: email }, function (err, user) {
    if (err) return done(err, false);
    if (!user) return done(null, false);

    // when the user is exist, compare passwords - is `password` equal to user.password ?
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err, false);
      if (!isMatch) return done(null, false);

      return done(null, user);
    })
  })
});

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromHeader('Authentication'),
  secretOrKey: config.secret
};

const jwtLogin  = new JWTStrategy(jwtOptions, function (jwt_payload, done) {
  User.findOne({ _id: jwt_payload.sub }, function (err, user) {
    if (err) {
      return done(err, false);
    }

    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
});

passport.use(jwtLogin);
passport.use(localLogin);
