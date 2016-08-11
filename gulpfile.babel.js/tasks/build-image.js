'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import size from 'gulp-size';
import notify from 'gulp-notify';

import del from 'del';
import pngquant from 'imagemin-pngquant';
import BrowserSync from 'browser-sync';

import {logDeleted} from '../lib/log';
import mode from '../lib/mode';
import {
  SRC_PATH_IMAGE,
  DEST_PATH_IMAGE,
  BS_SERVER_NAME,
  NOTICE_ERROR_FORMAT
} from '../config';

const imageminOptions = {
  use: [pngquant({
    quality: '10-80',
    speed: 2,
    verbose: true
  })]
};

export default function () {
  const watching = mode.watching;
  const bs = BrowserSync.get(BS_SERVER_NAME);

  return gulp.src(SRC_PATH_IMAGE)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(NOTICE_ERROR_FORMAT)
    })))
    .pipe(imagemin(imageminOptions))
    .pipe(size({title: 'image:', showFiles: true}))
    .pipe(gulp.dest(DEST_PATH_IMAGE))
    .pipe(gulpif(watching, bs.stream({once: true})));
}

export function cleanImage() {
  return del([DEST_PATH_IMAGE]).then(logDeleted);
}
