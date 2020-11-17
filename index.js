const express = require('express');
const mysql = require('mysql');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const app = express();

// make use of cookies for authentication
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Parsing form data and converting to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

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

require('./services/passport')(connection); // include passport services
require('./routes/signUpRoute')(app, connection); // sign up route
require('./routes/authRoutes')(app); // authentication routes



app.get('/random', (req, res) => {
    res.send({ tenet: "we live in a twilight world, no friends at dusk" });
});

app.listen(5000);
