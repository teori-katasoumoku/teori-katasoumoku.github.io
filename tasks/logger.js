'use strict';

import path from 'path';

import {log, colors} from 'gulp-util';
const {magenta} = colors;

import {rootDir} from './config';

export default class Logger {
  static logPaths(paths) {
    if (paths.length === 0) {
      return console.log('Nothing.');
    }
    paths.forEach(p => {
      p = path.relative(rootDir, p);
      console.log(magenta(p));
    });
  }

  static logDeleted(paths) {
    console.log('Deleted files and folders:');
    Logger.logPaths(paths);
  }
};
