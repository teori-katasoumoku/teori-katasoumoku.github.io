'use strict';

import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import {
  DEPLOY_TARGET_PATTERN,
  DEPLOY_TARGET_BRANCH
} from '../config';

export default function () {
  return gulp.src(DEPLOY_TARGET_PATTERN)
    .pipe(ghPages({branch: DEPLOY_TARGET_BRANCH}))
}
