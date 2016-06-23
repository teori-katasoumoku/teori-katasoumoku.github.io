'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import {copy, srcDir} from '../config';

export function copySrc() {
  return gulp.src(copy.src, {base:srcDir})
    .pipe(size({title: 'copy src:', showFiles: true}))
    .pipe(gulp.dest(copy.dest));
}

export function copyDoc() {
  return gulp.src(copy.doc)
    .pipe(size({title: 'copy docFiles:', showFiles: true}))
    .pipe(gulp.dest(copy.dest));
}
