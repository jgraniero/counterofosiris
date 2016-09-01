var autoprefixer = require('autoprefixer')
  , gulpif       = require('gulp-if')
  , less         = require('gulp-less')
  , minifyCSS    = require('gulp-minify-css')
  , postcss      = require('gulp-postcss')
  , rename       = require('gulp-rename');

module.exports = function(gulp, path, context) {
  return function(changedFiles) {
    return gulp
      .src(path.SRC_LESS)
      .pipe(less({
        paths: path.SRC_LESS_IMPORT_PATHS
      }))
      .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
      .pipe(gulp.dest(path.DIST_SRC_CSS))
      .pipe(gulpif(context.isProduction, minifyCSS()))
      .pipe(gulpif(context.isProduction, rename({ extname: '.min.css' })))
      .pipe(gulpif(context.isProduction, gulp.dest(path.DIST_BUILD_CSS)))
  };
};
