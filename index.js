const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const keys = require('./config/keys');

const app = express();

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: keys.mysqlUser,
    password: keys.mysqlPassword,
    database: keys.mysqlDatabase
});

// connect to mySQL database
connection.connect(function(err) {
    if (err) {
        throw err;
    }

    console.log("Database connection successful!");
});

passport.serializeUser((user, done) => {
    console.log(user);
    // done(null, user.id);
});

// passport local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    /*
    
    connection.query('SELECT * FROM users WHERE username="user3" ', function (error, results, fields) {
        if (error) {
            console.log("Query failed");
            return done(error);
        } else {
            console.log("Query successful");
            if (results.length == 0) {
                console.log("No user by that username");
                return done(null, false);
            } else {
                console.log("Found user");
                return done(null, result);
            }
        }
    });


    */
  }
));

require('./routes/authRoutes')(app); // authentication routes

app.get('/random', (req, res) => {
    res.send({ tenet: "we live in a twilight world, no friends at dusk" });
});


app.listen(5000);