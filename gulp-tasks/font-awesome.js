var replace = require('gulp-replace');

module.exports = function(gulp, path, context) {
  var regex = /(@fa-font-path:\s*")(.+)(";)/;
  return function() {
    gulp
      .src(['node_modules/font-awesome/less/variables.less'])
      .pipe(replace(regex, '$1' + '../fonts' + '$3'))
      .pipe(gulp.dest('node_modules/font-awesome/less', { overwrite: true }));
  };
};
