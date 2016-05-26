'use strict';

import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import {deployment} from '../config';

export default function () {
  return gulp.src(deployment.targetPattern)
    .pipe(ghPages({
      branch: deployment.branch
    }))
}
