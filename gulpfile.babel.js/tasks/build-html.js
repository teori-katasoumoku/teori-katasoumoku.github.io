'use strict';

import path from 'path';

import del from 'del';
import pug from 'pug';
import BrowserSync from 'browser-sync';

import gulp from 'gulp';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import tap from 'gulp-tap';
import gulpif from 'gulp-if';
import yaml from 'gulp-yaml';

import {logDeleted} from '../lib/log';
import mode from '../lib/mode';
import {
  SRC_PATH_CONTENT,
  DEST_PATH_CONTENT,
  getDestPath,
  BS_SERVER_NAME,
  NOTICE_ERROR_FORMAT
} from '../config';

export default function () {
  const watching = mode.watching;
  const bs = BrowserSync.get(BS_SERVER_NAME);

  return gulp.src(SRC_PATH_CONTENT)
    .pipe(gulpif(watching, plumber({
      errorHandler: notify.onError(NOTICE_ERROR_FORMAT)
    })))
    .pipe(yaml())
    .pipe(tap(applyTemplate))
    .pipe(size({title: 'html:', showFiles: true}))
    .pipe(gulp.dest(DEST_PATH_CONTENT))
    .pipe(gulpif(watching, bs.stream({once: true})));
}

export function cleanHtml() {
  return del([getDestPath('**', '*.html')]).then(logDeleted);
}

function applyTemplate(dataFile) {
  const parsedData = JSON.parse(dataFile.contents.toString());
  const parsedPath = path.parse(dataFile.path);
  const contents = replaceLineBreakToHtml(parsedData.contents);
  const compiled = pug.compileFile(parsedData.template, {
    pretty: true
  })(contents);

  parsedPath.base = `${parsedData.id}.html`;
  parsedPath.ext = '.html';
  parsedPath.name = parsedData.id;

  dataFile.path = path.format(parsedPath);
  dataFile.contents = new Buffer(compiled, 'utf8');
}

function replaceLineBreakToHtml(obj){
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/\n/g, '<br>');
    }
  }
  return obj;
}
