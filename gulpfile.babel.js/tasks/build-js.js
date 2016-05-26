'use strict';

import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import size from 'gulp-size';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import BrowserSync from 'browser-sync';

import {js, server} from '../config';
import mode from '../lib/mode';
import {logRebuilding} from '../lib/log';

export default function () {
  const bs = BrowserSync.get(server.name);
  const bundler = browserify({
    entries: [js.src.path],
    cache: {},
    packageCache: {},
    debug: mode.watching
  }).transform('babelify', {sourceMaps: true});

  const bundle = () => {
    return bundler.bundle()
      .on('error', function (err) {
        console.error(err);
        this.emit('end');
      })
      .pipe(source(js.dest.file))
      .pipe(buffer())
      .pipe(gulpif(mode.watching, sourcemaps.init({loadMaps: true})))
      //.pipe(gulpif(watching, uglify()))
      .pipe(gulpif(mode.watching, sourcemaps.write('./')))
      .pipe(size({title: 'js  :', showFiles: true}))
      .pipe(gulp.dest(js.dest.dir))
      .pipe(bs.stream());
  };

  const rebundle = () => {
    logRebuilding();
    return bundle();
  };

  if (mode.watching) {
    bundler.plugin(watchify);
    bundler.on('update', rebundle);
  }

  return bundle();
}
