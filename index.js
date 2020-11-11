const express = require('express');
const mysql = require('mysql');
const keys = require('./config/keys');
require('./services/passport'); // include passport authentication strategy

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

require('./routes/authRoutes')(app); // authentication routes

app.get('/random', (req, res) => {
    res.send({ tenet: "we live in a twilight zone, no friends at dusk" });
});


app.listen(5000);