'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const del = require('del');
const jade = require('gulp-jade');

const config = require('./tasks/config');

gulp.task('default', [
  'clean',
  'jade'
]);

gulp.task('clean', (done) => {
  del([config.dest()]).then(paths => {
    const deleted = paths.length === 0 ? 'Nothing.' : gutil.colors.magenta(paths.join('\n'));
    gutil.log('Deleted files and folders:\n', deleted);
    return done();
  });
});

gulp.task('jade', ['clean'], () => {
  return gulp.src(config.src('templates', '**', '!(_)*.jade'))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(config.dest()));
});
