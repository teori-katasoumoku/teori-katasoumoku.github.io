'use strict';

import gulp from 'gulp';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import BrowserSync from 'browser-sync';

import {js, server} from '../config';
import mode from '../lib/mode';
import {logRebuilding} from '../lib/log';

export default function () {
  const prod = mode.prod;
  const watch = mode.watching;
  const bs = BrowserSync.get(server.name);
  const bundler = browserify({
    entries: [js.src.path],
    cache: {},
    packageCache: {},
    debug: watch
  }).transform('babelify', {sourceMaps: true});

  const bundle = () => {
    return bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(js.dest.file))
      .pipe(buffer())
      .pipe(gulpif(watch, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(prod, uglify()))
      .pipe(gulpif(watch, sourcemaps.write('./')))
      .pipe(size({title: 'js  :', showFiles: true}))
      .pipe(gulp.dest(js.dest.dir))
      .pipe(bs.stream());
  };

  const rebundle = () => {
    logRebuilding();
    return bundle();
  };

  if (watch) {
    bundler.plugin(watchify);
    bundler.on('update', rebundle);
  }

  return bundle();
}
