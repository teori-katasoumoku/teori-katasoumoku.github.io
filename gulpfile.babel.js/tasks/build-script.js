'use strict';

import del from 'del';

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

import mode from '../lib/mode';
import {logRebuilding, logDeleted} from '../lib/log';
import {
  SRC_PATH_SCRIPT,
  SCRIPT_BUNDLE_BASENAME,
  DEST_PATH_SCRIPT,
  BS_SERVER_NAME
} from '../config';

export default function () {
  const prod = mode.prod;
  const watching = mode.watching;
  const bs = BrowserSync.get(BS_SERVER_NAME);
  const bundler = browserify({
    entries: [SRC_PATH_SCRIPT],
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
      .pipe(source(`${SCRIPT_BUNDLE_BASENAME}.js`))
      .pipe(buffer())
      .pipe(gulpif(watching, sourcemaps.init({loadMaps: true})))
      .pipe(gulpif(prod, uglify()))
      .pipe(gulpif(watching, sourcemaps.write('./')))
      .pipe(size({title: 'script  :', showFiles: true}))
      .pipe(gulp.dest(DEST_PATH_SCRIPT))
      .pipe(gulpif(watching, bs.stream({once: true})));
  };

  const rebundle = () => {
    logRebuilding();
    return bundle();
  };

  if (watching) {
    bundler.plugin(watchify);
    bundler.on('update', rebundle);
  }

  return bundle();
}

export function cleanScript() {
  return del([DEST_PATH_SCRIPT]).then(logDeleted);
}
