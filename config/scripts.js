var getenv = require('getenv');

module.exports = function(nodeEnv) {
  var isProduction = nodeEnv === 'production';
  return {
    css: isProduction ? 'main.min.css' : 'main.css',
    js:  isProduction ? 'index.bundle.min.js' : 'index.bundle.js'
  };
};
