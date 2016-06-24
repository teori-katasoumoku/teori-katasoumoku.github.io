'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import purify from 'gulp-purifycss'
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import BrowserSync from 'browser-sync';

import {templates, styles, server, notice} from '../config';
import mode from '../lib/mode';

export default function () {
  const bs = BrowserSync.get(server.name);
  const watching = mode.watching;

  return gulp.src(styles.src.path)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(notice.errorFormat)
    })))
    .pipe(gulpif(watching, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(watching, sourcemaps.write('./')))
    .pipe(gulpif(!watching, purify([templates.dest.path])))
    .pipe(size({title: 'css :', showFiles: true}))
    .pipe(gulp.dest(styles.dest.dir))
    .pipe(gulpif(watching, bs.stream({once: true})));
}
