'use strict';

import del from 'del';

import gulp from 'gulp';
import gutil from 'gulp-util';
import pug from 'gulp-pug';

import {dest, templates} from './tasks/config';

gulp.task('default', [
  'clean',
  'pug'
]);

gulp.task('clean', (done) => {
  del([dest]).then(paths => {
    const deleted = paths.length === 0 ? 'Nothing.' : gutil.colors.magenta(paths.join('\n'));
    gutil.log('Deleted files and folders:\n', deleted);
    return done();
  });
});

gulp.task('pug', ['clean'], () => {
  return gulp.src(templates.src)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest));
});

