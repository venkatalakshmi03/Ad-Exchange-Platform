const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs');

module.exports = (connection) => {
    // after logging in via the local strategy below, takes unique attribute of user information, 
    // generates token, and places token into cookie
    passport.serializeUser((user, done) => {
        done(null, user.Email);
    });

    // whenever user accesses site, extracts token out of cookie and tries to translate it to a user
    passport.deserializeUser((email, done) => {
        connection.query('SELECT * from `User` INNER JOIN `Advertiser` ON `User_ID`=`Advertiser_ID` WHERE `Email` = ?', [email], function(error, advertisorResults, fields) {
            if (error) {
                return done(error);
            } else {
                if (advertisorResults.length == 0) {
                    // user not in advertisor, check publisher
                    connection.query('SELECT * FROM `User` INNER JOIN `Publisher` ON `User_ID`=`Publisher_ID` WHERE `Email` = ?', [email], function(error, publisherResults, fields) {
                        
                        if (publisherResults.length == 0) {
                            // not in publisher, no user found
                            return done(null, false);
                        }
                        
                        // user in publisher
                        return done(null, publisherResults[0]);
                    });
                } else {
                   // user in advertisor
                   return done(null, advertisorResults[0]);
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
        connection.query('SELECT * from `User` INNER JOIN `Advertiser` ON `User_ID`=`Advertiser_ID` WHERE `Email` = ?', [email], function(error, advertisorResults, fields) {
            if (error) {
                return done(error);
            } else {
                if (advertisorResults.length == 0) {
                    // user not in advertisor, check publisher
                    connection.query('SELECT * FROM `User` INNER JOIN `Publisher` ON `User_ID`=`Publisher_ID` WHERE `Email` = ?', [email], function(error, publisherResults, fields) {
                       if (publisherResults.length == 0) {
                           // not in publisher
                           return done(null, false);
                       } else {
                            // compare password with hashed password
                            bcrypt.compare(password, publisherResults[0].User_Password, function(err, res) {
                                if (res) {
                                    return done(null, publisherResults[0]); // password match, send user information to serializeUser above
                                } 

                                console.log("Incorrect password");
                                return done(null, false);
                            });
                       }
                    });
                } else {
                    // compare password with hashed password
                    bcrypt.compare(password, advertisorResults[0].User_Password, function(err, res) {
                        if (res) {
                            return done(null, advertisorResults[0]); // password, match send user information to serializeUser above
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

