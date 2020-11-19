const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/random', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/adsignup', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/pubsignup', { target: 'http://localhost:5000' }));
    app.use(proxy('/auth/login', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/logout', { target: 'http://localhost:5000' }));
    app.use(proxy('/api/current_user', { target: 'http://localhost:5000' }));
};