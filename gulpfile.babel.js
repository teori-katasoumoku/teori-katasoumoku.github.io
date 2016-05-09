'use strict';

import del from 'del';

import gulp from 'gulp';
import {log, colors} from 'gulp-util';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import purify from 'gulp-purifycss'

import {dest, templates, style} from './tasks/config';
import {logPaths} from './tasks/paths'

gulp.task('default', [
  'pug',
  'sass'
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

gulp.task('clean:style', (done) => {
  del([style.dest]).then(paths => {
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

gulp.task('sass', ['clean:style'], () => {
  return gulp.src(style.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(purify([templates.dest]))
    .pipe(gulp.dest(style.dest));
});
