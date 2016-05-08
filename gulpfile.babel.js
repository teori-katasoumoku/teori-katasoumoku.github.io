'use strict';

import del from 'del';

import gulp from 'gulp';
import gutil from 'gulp-util';
import jade from 'gulp-jade';

import {src, dest} from './tasks/config';

gulp.task('default', [
  'clean',
  'jade'
]);

gulp.task('clean', (done) => {
  del([dest()]).then(paths => {
    const deleted = paths.length === 0 ? 'Nothing.' : gutil.colors.magenta(paths.join('\n'));
    gutil.log('Deleted files and folders:\n', deleted);
    return done();
  });
});

gulp.task('jade', ['clean'], () => {
  return gulp.src(src('templates', '**', '!(_)*.jade'))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(dest()));
});
