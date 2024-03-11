const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://54.180.211.174/api/v1/exams",
      changeOrigin: true,
    })
  );
};