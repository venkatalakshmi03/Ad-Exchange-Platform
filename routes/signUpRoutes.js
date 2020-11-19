const bcrypt = require('bcryptjs');

module.exports = (app, connection) => {
    app.post('/api/adsignup', async (req, res) => {   
        console.log(req.body);
        connection.query('SELECT * FROM `User` WHERE `Email` = ?', [req.body.email], function(error, emailResults, fields) {
            if (error) {
                console.log("Email query failed");
            } else {
                if (emailResults.length > 0) {
                    console.log("Email already exists for this user");
                } else {
                    console.log("No user has this email");
                    connection.query('SELECT * FROM `Advertiser` WHERE `Advertiser_Name` = ?', [req.body.advertiserName], function(error, advertiserResults, fields) {
                        if (advertiserResults.length > 0) {
                            console.log("Advertiser name already exists");
                        } else {
                            connection.query('SELECT COUNT(*) AS count FROM `USER`', function(error, userRows, fields) {
                                console.log(userRows[0].count);
                                bcrypt.genSalt(10, function(err, salt) {
                                     bcrypt.hash(req.body.password, salt, function(err, hash) {
                                          const user = { User_ID: userRows[0].count + 1000, First_Name: req.body.firstName, Last_Name: req.body.lastName, Email: req.body.email, User_Password: hash }
                                          
                                          connection.query('INSERT INTO `User` SET ?', user, function(error, results, fields) {
                                              if (error) {
                                                  console.log("User insertion failed");
                                              } else {
                                                  const advertiser = { Advertiser_ID: userRows[0].count + 1000, Advertiser_Name: req.body.advertiserName, Ad_Description: req.body.adDescription, BudgetedCost: req.body.adBudget };
                                                  
                                                  connection.query('INSERT INTO `Advertiser` SET ?', advertiser, function(error, results, fields) {
                                                      if (error) {
                                                          console.log("Advertiser insertion failed");
                                                      } else {
                                                          console.log("Successful advertiser sign up");
                                                      }
                                                  });
                                              }
                                          }); 
                                     });
                                });
                            });
                        }
                    });              
                }
            }
        }) // MAIN QUERY ENDER
        
        res.redirect('/adsignup');
    });
    
    app.post('/api/pubsignup', (req, res) => {
        console.log(req.body);
        connection.query('SELECT * FROM `User` WHERE `Email` = ?', [req.body.email], function(error, emailResults, fields) {
            if (error) {
                console.log("Email query failed");
            } else {
                if (emailResults.length > 0) {
                    console.log("Email already exists for this user");
                } else {
                    console.log("No user has this email");
                    connection.query('SELECT * FROM `Publisher` WHERE `Publisher_Name` = ?', [req.body.publisherName], function(error, publisherResults, fields) {
                        if (publisherResults.length > 0) {
                            console.log("Advertiser name already exists");
                        } else {
                            connection.query('SELECT COUNT(*) AS count FROM `USER`', function(error, userRows, fields) {
                                console.log(userRows[0].count);
                                bcrypt.genSalt(10, function(err, salt) {
                                     bcrypt.hash(req.body.password, salt, function(err, hash) {
                                          const user = { User_ID: userRows[0].count + 1000, First_Name: req.body.firstName, Last_Name: req.body.lastName, Email: req.body.email, User_Password: hash }
                                          
                                          connection.query('INSERT INTO `User` SET ?', user, function(error, results, fields) {
                                              if (error) {
                                                  console.log("User insertion failed");
                                              } else {
                                                  const publisher = { Publisher_ID: userRows[0].count + 1000, Publisher_Name: req.body.publisherName };
                                                  
                                                  connection.query('INSERT INTO `Publisher` SET ?', publisher, function(error, results, fields) {
                                                      if (error) {
                                                          console.log("Publisher insertion failed");
                                                      } else {
                                                          console.log("Successful publisher sign up");
                                                      }
                                                  });
                                              }
                                          }); 
                                     });
                                });
                            });
                        }
                    });              
                }
            }
        }) // MAIN QUERY ENDER
        
        res.redirect('/pubsignup');
    });
}







