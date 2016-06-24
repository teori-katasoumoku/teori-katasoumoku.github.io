'use strict';

import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import gulpif from 'gulp-if';
import plumber from 'gulp-plumber';
import size from 'gulp-size';

import pngquant from 'imagemin-pngquant';
import BrowserSync from 'browser-sync';

import {images, server} from '../config';
import mode from '../lib/mode';

const imageminOptions = {
  use: [pngquant({
    quality: '10-80',
    speed: 2,
    verbose: true
  })]
};

export default function () {
  const watching = mode.watching;
  const bs = BrowserSync.get(server.name);

  return gulp.src(images.src.path)
    .pipe(gulpif(watching, plumber()))
    .pipe(imagemin(imageminOptions))
    .pipe(size({title: 'image:', showFiles: true}))
    .pipe(gulp.dest(images.dest.dir))
    .pipe(gulpif(watching, bs.stream({once: true})));
}
