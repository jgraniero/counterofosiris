var del = require('del');

module.exports = function(gulp, path, context) {
  return function(cb) {
    del([path.DIST], cb);
  };
};
