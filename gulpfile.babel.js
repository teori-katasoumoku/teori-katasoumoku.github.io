'use strict';

import del from 'del';
import lodash from 'lodash';
const {debounce} = lodash;

import gulp from 'gulp';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import purify from 'gulp-purifycss'
import size from 'gulp-size';
import gulpif from 'gulp-if';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';

import BrowserSync from 'browser-sync';
const bs = BrowserSync.create();
import bsCloseHook from 'browser-sync-close-hook';

import {DEST, templates, styles} from './tasks/config';
import Logger from './tasks/logger'
const {logDeleted} = Logger;

const ERROR_FORMAT = 'Error: <%= error.message %>';

let watching = false;

const bsOptions = {
  server: {
    baseDir: DEST
  },
  browser: ['google chrome'], //'google chrome', 'firefox', 'safari'
  reloadOnRestart: true,
  reloadDelay: 100,
  reloadDebounce: 100
};

bs.use({
  plugin() {},
  hooks: {
    'client:js': bsCloseHook
  }
});

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'pug',
  'sass'
]);

gulp.task('clean:all', () => {
  return del([DEST]).then(logDeleted);
});

gulp.task('clean:html', () => {
  return del([templates.DEST]).then(logDeleted);
});

gulp.task('clean:style', () => {
  return del([styles.DEST]).then(logDeleted);
});

gulp.task('pug', ['clean:html'], () => {
  return gulp.src(templates.SRC)
    .pipe(gulpif(watching, plumber({errorHandler: notify.onError(ERROR_FORMAT)})))
    .pipe(pug({pretty: true}))
    .pipe(size({title: 'html:', showFiles: true}))
    .pipe(gulp.dest(DEST))
    .pipe(bs.stream());
});

gulp.task('sass', ['pug', 'clean:style'], () => {
  return gulp.src(styles.SRC)
    .pipe(gulpif(watching, plumber({errorHandler: notify.onError(ERROR_FORMAT)})))
    .pipe(gulpif(watching, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(watching, sourcemaps.write('../map')))
    .pipe(gulpif(!watching, purify([templates.DEST])))
    .pipe(size({title: 'css:', showFiles: true}))
    .pipe(gulp.dest(styles.DEST))
    .pipe(bs.stream());
});

gulp.task('enable-watching', (done) => {
  watching = true;
  done();
});

gulp.task('watch:prod', ['build'], (done) => {
  bs.init(bsOptions);

  watch(templates.WATCH_FILES, debounce(() => {
    runSequence(['pug', 'sass']);
  }, 400));
  watch(styles.WATCH_FILES, debounce(() => {
    runSequence(['sass']);
  }, 400));

  return done();
});

gulp.task('watch:dev', ['enable-watching', 'build'], (done) => {
  bs.init(bsOptions);

  watch(templates.WATCH_FILES, debounce(() => {
    runSequence(['pug', 'sass']);
  }, 400));
  watch(styles.WATCH_FILES, debounce(() => {
    runSequence(['sass']);
  }, 400));

  return done();
});
