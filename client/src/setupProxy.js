const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/random', { target: 'http://localhost:5000' }));
};