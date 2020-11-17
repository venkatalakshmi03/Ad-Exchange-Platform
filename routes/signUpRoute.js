const bcrypt = require('bcryptjs');

module.exports = (app, connection) => {
    app.post('/signup', (req, res) => {
        console.log(req.body);
         connection.query('SELECT * FROM `users` WHERE `email` = ?', [req.body.email], function (error, results, fields) {
                if (error) {
                    console.log("Query failed");
                } else {
                    if (results.length == 0) {
                         // user with email doesn't exist, attempt to hash password and store info in db
                         bcrypt.genSalt(10, function(err, salt) {
                            // hash password
                            bcrypt.hash(req.body.password, salt, function(err, hash) {
                                // store user's email and hashed password in database
                                const user  = { email: req.body.email, password: hash };
                                connection.query('INSERT INTO `users` SET ?', user, function(error, results, fields) {
                                    if (error) {
                                        console.log("Insertion failed");
                                    } else {
                                        console.log("Able to sign up the user, here are the results:");
                                        console.log(results);
                                    }
                                });
                            });
                        });
                    } else {
                        console.log("User with email already exists");
                    } 
                }
            }); 
        res.redirect('/'); // return to home page
    });
}