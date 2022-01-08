const { createProxyMiddleware } = require('http-proxy-middleware');
const config = require("./config/config");

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: `${config.hostUrl}:5000`,
            changeOrigin: true,
        })
    );
};