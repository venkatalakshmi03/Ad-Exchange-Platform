const passport = require('passport');

module.exports = app => {
    app.post('/login', (req, res) => {
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/' })(req, res);
    });
    
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });
    
    app.get('/api/current_user', (req, res) => {
        res.send({ current_user: req.user });
    });
};