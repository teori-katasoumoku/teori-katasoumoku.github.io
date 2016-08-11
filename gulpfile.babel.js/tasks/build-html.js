'use strict';

import path from 'path';

import pug from 'pug';
import BrowserSync from 'browser-sync';

import gulp from 'gulp';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import tap from 'gulp-tap';
import gulpif from 'gulp-if';
import yaml from 'gulp-yaml';

import {templates, contents, server, notice} from '../config';
import mode from '../lib/mode';

export default function () {
  const watching = mode.watching;
  const bs = BrowserSync.get(server.name);

  return gulp.src(contents.src.path)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(notice.errorFormat)
    })))
    .pipe(yaml())
    .pipe(tap(applyTemplate))
    .pipe(size({title: 'html:', showFiles: true}))
    .pipe(gulp.dest(templates.dest.dir))
    .pipe(gulpif(watching, bs.stream({once: true})));
}

function applyTemplate(dataFile) {
  const parsedData = JSON.parse(dataFile.contents.toString());
  const parsedPath = path.parse(dataFile.path);
  const compiled = pug.compileFile(parsedData.template, {
    pretty: true
  })(parsedData.contents);

  parsedPath.base = `${parsedData.id}.html`;
  parsedPath.ext = '.html';
  parsedPath.name = parsedData.id;

  dataFile.path = path.format(parsedPath);
  dataFile.contents = new Buffer(compiled, 'utf8');
}
