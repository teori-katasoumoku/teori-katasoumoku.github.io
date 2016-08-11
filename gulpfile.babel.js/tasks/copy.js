'use strict';

import del from 'del';

import gulp from 'gulp';
import size from 'gulp-size';

import {logDeleted as log} from '../lib/log';
import {
  SRC_PATH,
  SRC_PATH_FONT,
  SRC_PATHS_DOC,
  DEST_PATH,
  DEST_PATH_FONT,
  DEST_PATH_DOC,
  DOC_FILES,
  getDestPath
} from '../config';

export function copyFont() {
  return gulp.src(SRC_PATH_FONT, {base: SRC_PATH})
    .pipe(size({title: 'copy src:', showFiles: true}))
    .pipe(gulp.dest(DEST_PATH));
}

export function copyDoc() {
  return gulp.src(SRC_PATHS_DOC)
    .pipe(size({title: 'copy docFiles:', showFiles: true}))
    .pipe(gulp.dest(DEST_PATH_DOC));
}

export function cleanCopiedFont() {
  return del([DEST_PATH_FONT]).then(log);
}

export function cleanCopiedDoc() {
  const files = DOC_FILES.map(file => getDestPath(file));
  return del(files).then(log);
}
