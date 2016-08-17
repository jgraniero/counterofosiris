module.exports = function(gulp, path, context) {
  return function() {
    return gulp
      .src('node_modules/font-awesome/fonts/**.*')
      .pipe(gulp.dest(path.DIST_FONTS));
  };
};
