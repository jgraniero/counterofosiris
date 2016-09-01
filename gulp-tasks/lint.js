var cache  = require('gulp-cached')
  , eslint = require('gulp-eslint');

module.exports = function(gulp, path, context) {
  return function() {
    return gulp
      .src(path.SRC_JS)
      .pipe(cache('lint'))
      .pipe(eslint())
      .pipe(eslint.format('stylish'));
  };
};
