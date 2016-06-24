'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import BrowserSync from 'browser-sync';

import {templates, server, notice} from '../config';
import mode from '../lib/mode';

export default function () {
  const watching = mode.watching;
  const bs = BrowserSync.get(server.name);
  
  return gulp.src(templates.src.path)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(notice.errorFormat)
    })))
    .pipe(pug({pretty: true}))
    .pipe(size({title: 'html:', showFiles: true}))
    .pipe(gulp.dest(templates.dest.dir))
    .pipe(gulpif(watching, bs.stream({once: true})));
}
