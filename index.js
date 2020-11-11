const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const app = express();

passport.use(new LocalStrategy(
  function(username, password, done) {
    return done(null, false, { message: 'Incorrect username.' });
  }
));

app.listen(5000);