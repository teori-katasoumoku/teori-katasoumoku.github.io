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
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import BrowserSync from 'browser-sync';
const bs = BrowserSync.create();
import bsCloseHook from 'browser-sync-close-hook';

import {destDir, templates, styles, js} from './tasks/config';
import Logger from './tasks/logger'
const {logDeleted} = Logger;

const ERROR_FORMAT = 'Error: <%= error.message %>';

let watching = false;

const bsOptions = {
  server: {
    baseDir: destDir
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

const watchFn = (done) => {
  watch(templates.watch.pattern, debounce(() => {
    runSequence(['pug', 'sass']);
  }, 400));
  watch(styles.watch.pattern, debounce(() => {
    runSequence(['sass']);
  }, 400));

  bs.init(bsOptions, done);
};

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'pug',
  'browserify',
  'sass'
]);

gulp.task('clean:all', () => {
  return del([destDir]).then(logDeleted);
});

gulp.task('clean:html', () => {
  return del([templates.dest.path]).then(logDeleted);
});

gulp.task('clean:style', () => {
  return del([styles.dest.dir]).then(logDeleted);
});

gulp.task('clean:js', () => {
  return del([js.dest.dir]).then(logDeleted);
});

gulp.task('pug', ['clean:html'], () => {
  return gulp.src(templates.src.path)
    .pipe(gulpif(watching, plumber({errorHandler: notify.onError(ERROR_FORMAT)})))
    .pipe(pug({pretty: true}))
    .pipe(size({title: 'html:', showFiles: true}))
    .pipe(gulp.dest(templates.dest.dir))
    .pipe(bs.stream());
});

gulp.task('sass', ['pug', 'clean:style'], () => {
  return gulp.src(styles.src.path)
    .pipe(gulpif(watching, plumber({errorHandler: notify.onError(ERROR_FORMAT)})))
    .pipe(gulpif(watching, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(watching, sourcemaps.write('./')))
    .pipe(gulpif(!watching, purify([templates.dest.path])))
    .pipe(size({title: 'css:', showFiles: true}))
    .pipe(gulp.dest(styles.dest.dir))
    .pipe(bs.stream());
});

gulp.task('browserify', ['clean:js'], (done) => {
  const b = browserify({
    entries: [js.src.path],
    cache: {},
    packageCache: {},
    debug: watching
  });
  const bundle = () => {
    b.transform('babelify', {sourceMaps: true})
      .bundle()
      .pipe(source(js.dest.file))
      .pipe(buffer())
      .pipe(gulpif(watching, sourcemaps.init({loadMaps: true})))
      //.pipe(gulpif(watching, uglify()))
      .pipe(gulpif(watching, sourcemaps.write('./')))
      .pipe(gulp.dest(js.dest.dir).on('end', done));
  };

  if (watching) {
    b.plugin(watchify);
    b.on('update', bundle);
  }

  return bundle();
});

gulp.task('enable-watching', (done) => {
  watching = true;
  done();
});

gulp.task('watch:prod', ['build'], watchFn);
gulp.task('watch:dev', ['enable-watching', 'build'], watchFn);
