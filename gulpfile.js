var gulp = require('gulp');
var argv = require('yargs').argv;
var path = require('./config').path;

var context = {
  isProduction: !!argv.production,
  isWatchTask: argv._.length ? argv._[0] == 'watch' : true
};

function getTask(taskName) {
  return require('./gulp-tasks/' + taskName)(gulp, path, context);
}

gulp.task('clean', getTask('clean'));
gulp.task('font-awesome', getTask('font-awesome'));
gulp.task('icons', getTask('icons'));
gulp.task('less', getTask('less'));
gulp.task('watch', ['less', 'icons', 'font-awesome'], getTask('watch'));

gulp.task('build', [
  'clean',
  'icons',
  'font-awesome',
  'less']);

gulp.task('default', ['watch']);
