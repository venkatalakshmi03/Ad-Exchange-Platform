const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');

module.exports = (connection) => {
    // after logging in via the local strategy below, takes unique attribute of user information, 
    // generates token, and places token into cookie
    passport.serializeUser((user, done) => {
        done(null, user.email);
    });

    // whenever user accesses site, extracts token out of cookie and tries to translate it to a user
    passport.deserializeUser((email, done) => {
        connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], function (error, results, fields) {
            if (error) {
                console.log("Query failed");
                return done(error);
            } else {
                if (results.length == 0) {
                    console.log("Not logged in");
                    return done(null, false);
                } else {
                    console.log("Found user");
                    return done(null, results[0]);
                } 
            }
        }); 
    });

    // use passport local strategy
    passport.use(new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },
      function(req, email, password, done) {
        connection.query('SELECT * FROM `users` WHERE `email` = ?', [email], function (error, results, fields) {
            if (error) {
                console.log("Query failed");
                return done(error);
            } else {
                if (results.length == 0) {
                    console.log("No user with that email");
                    return done(null, false);
                } else {
                    console.log("Found user");
                    
                    // compare password with hashed password
                    bcrypt.compare(req.body.password, results[0].password, function(err, res) {
                        if (res) {
                            return done(null, results[0]); // send user information to serializeUser above
                        } 
                        
                        console.log("Incorrect password");
                        return done(null, false);
                    });
                } 
            }
        }); 
      }
    ));
}
