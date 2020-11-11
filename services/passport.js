const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('../config/keys');

passport.use(new LocalStrategy(
  function(username, password, done) {
    // go into mySql database and try to retrieve a user
    return done(null, false, { message: 'Incorrect username.' });
  }
));