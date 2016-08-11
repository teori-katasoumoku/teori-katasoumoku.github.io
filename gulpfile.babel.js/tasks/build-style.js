'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import purify from 'gulp-purifycss'
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

import del from 'del';
import BrowserSync from 'browser-sync';

import mode from '../lib/mode';
import {logDeleted} from '../lib/log';
import {
  SRC_PATH_STYLE,
  DEST_PATH_STYLE,
  getDestPath,
  BS_SERVER_NAME,
  NOTICE_ERROR_FORMAT
} from '../config';

export default function () {
  const bs = BrowserSync.get(BS_SERVER_NAME);
  const watching = mode.watching;

  return gulp.src(SRC_PATH_STYLE)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(NOTICE_ERROR_FORMAT)
    })))
    .pipe(gulpif(watching, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(watching, sourcemaps.write('./')))
    .pipe(gulpif(!watching, purify([getDestPath('**', '*.html')])))
    .pipe(size({title: 'style :', showFiles: true}))
    .pipe(gulp.dest(DEST_PATH_STYLE))
    .pipe(gulpif(watching, bs.stream({once: true})));
}

export function cleanStyle() {
  return del([DEST_PATH_STYLE]).then(logDeleted);
}
