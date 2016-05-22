'use strict';

import gulp from 'gulp';
import size from 'gulp-size';
import {copy} from '../config';

export default function () {
  return gulp.src(copy.src)
    .pipe(size({title: 'copy:', showFiles: true}))
    .pipe(gulp.dest(copy.dest));
}
