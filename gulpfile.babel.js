'use strict';

import del from 'del';

import gulp from 'gulp';
import {log, colors} from 'gulp-util';
import pug from 'gulp-pug';

import {dest, templates} from './tasks/config';
import {logPaths} from './tasks/paths'

gulp.task('default', [
  'pug'
]);

gulp.task('clean:all', (done) => {
  del([dest]).then(paths => {
    log('Deleted files and folders:');
    logPaths(paths);
    return done();
  });
});

gulp.task('clean:html', (done) => {
  del([templates.dest]).then(paths => {
    log('Deleted files and folders:');
    logPaths(paths);
    return done();
  });
});

gulp.task('pug', ['clean:html'], () => {
  return gulp.src(templates.src)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(dest));
});
