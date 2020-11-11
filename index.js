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

connection.query('SELECT * FROM users', function (error, results, fields) {
    if (error) {
        console.log("Query failed");
        console.log(error);
    } else {
        console.log("Query successful");
        console.log(results);
    }
});

// passport local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    // go into mySql database and try to retrieve a user
    return done(null, false, { message: 'Incorrect username.' });
  }
));

require('./routes/authRoutes')(app); // authentication routes

app.get('/random', (req, res) => {
    res.send({ tenet: "we live in a twilight zone, no friends at dusk" });
});


app.listen(5000);