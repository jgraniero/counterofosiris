var gutil = require('gulp-util');

module.exports = function(gulp, path, context) {
  return function() {
    gulp.watch(path.SRC_LESS_WITH_PARTIALS, ['less']);
    gutil.log(gutil.colors.bold.green('Watching for changes...'));
  };
};
