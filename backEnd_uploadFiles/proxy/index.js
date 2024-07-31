const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  let target;

  // قم بتعريف عناوين URL التي ستتم توجيهها إلى تطبيق Node.js
  if (req.url.startsWith('/api')) {
    target = 'http://localhost:3000'; // عنوان URL الخاص بتطبيق Node.js
  } else {
    target = 'http://localhost:3001'; // عنوان URL الخاص بتطبيق Vue.js
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/',
    },
  })(req, res);
};