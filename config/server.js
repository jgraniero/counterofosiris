var getenv = require('getenv');

module.exports = function(nodeEnv, path) {
  var isProduction = nodeEnv === 'production';
  var assets = '/public';
  return {
    cssDir: isProduction ? path.DIST_BUILD_CSS : path.DIST_SRC_CSS,
    cssResource:   assets + '/css',
    fontsDir:      path.DIST_FONTS,
    fontsResource: assets + '/fonts',
    jsDir:         isProduction ? path.DIST_BUILD_JS : path.DIST_SRC_JS,
    jsResource:    assets + '/js',
    port:          getenv.int('TRIALS_COUNTER_APP_PORT', 9005)
  };
};
