'use strict';

import fs from 'fs';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';

import {js} from '../config';

export default function (watching, callback) {
  const bs = BrowserSync.get(server.name);
  const bundler = browserify({
    entries: [js.src.path],
    cache: {},
    packageCache: {},
    debug: watching
  }).transform('babelify', {sourceMaps: true});

  const bundle = () => {
    return bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(js.dest.file))
      .pipe(buffer())
      .pipe(gulpif(watching, sourcemaps.init({loadMaps: true})))
      //.pipe(gulpif(watching, uglify()))
      .pipe(gulpif(watching, sourcemaps.write('./')))
      .pipe(size({title: 'js  :', showFiles: true}))
      .pipe(gulp.dest(js.dest.dir))
      .pipe(bs.stream());
  };

  if (watching) {
    bundler.plugin(watchify);
    bundler.on('update', bundle);
  }

  return bundle();
}
