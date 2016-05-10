'use strict';

import del from 'del';

import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import purify from 'gulp-purifycss'

import {dest, templates, style} from './tasks/config';
import Logger from './tasks/logger'

const {logDeleted} = Logger;
gulp.task('default', [
  'pug',
  'sass'
]);

gulp.task('clean:all', () => {
  return del([dest]).then(logDeleted);
});

gulp.task('clean:html', () => {
  return del([templates.dest]).then(logDeleted);
});

gulp.task('clean:style', () => {
  return del([style.dest]).then(logDeleted);
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
