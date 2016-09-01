var babelify   = require('babelify')
  , browserify = require('browserify')
  , buffer     = require('vinyl-buffer')
  , es         = require('event-stream')
  , gulpif     = require('gulp-if')
  , gutil      = require('gulp-util')
  , rename     = require('gulp-rename')
  , source     = require('vinyl-source-stream')
  , uglify     = require('gulp-uglify')
  , watchify   = require('watchify');

function getRebundle(gulp, path, context, bundler, filenames) {
  return function() {
    return bundler
      .bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red('Browserify ERROR ' + err.message));
      })
      .pipe(source(filenames.bundle))
      .pipe(gulp.dest(path.DIST_SRC_JS))
      .pipe(gulpif(context.isProduction, buffer()))
      .pipe(gulpif(context.isProduction, uglify()))
      .pipe(gulpif(context.isProduction, rename(filenames.bundleMin)))
      .pipe(gulpif(context.isProduction, gulp.dest(path.DIST_BUILD_JS)));
  };
}

function getLog(filename) {
  return function(message) {
    gutil.log(gutil.colors.yellow(filename) + ' ' + gutil.colors.white(message));
  };
}

function getFilenames(out) {
  return {
    bundle:    out + '.bundle.js',
    bundleMin: out + '.bundle.min.js'
  };
}

module.exports = function(gulp, path, context) {
  return function(done) {
    var tasks = path.BUNDLES.map(function(entry) {
      var bundler = browserify({
        entries: [entry.entryPoint],
        debug:   !context.isProduction,
        cache:   {}, packageCache: {}, fullPaths: true
      })
      .transform('babelify', { presets: 'es2015' });

      if (context.isWatchTask) {
        bundler = watchify(bundler);
      }

      var filenames = getFilenames(entry.out);
      var rebundle = getRebundle(gulp, path, context, bundler, filenames);

      bundler.on('log', getLog(filenames.bundle));
      bundler.on('update', rebundle);

      return rebundle();
    });

    return es.merge.apply(null, tasks);
  };
};
