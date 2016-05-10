'use strict';

import path from 'path';

import {log, colors} from 'gulp-util';
const {magenta} = colors;

import {root} from './config';

export default class Logger {
  static logPaths(paths) {
    if (paths.length === 0) {
      return console.log('Nothing.');
    }
    paths.forEach(p => {
      p = path.relative(root, p);
      console.log(magenta(p));
    });
  }

  static logDeleted(paths) {
    log('Deleted files and folders:');
    Logger.logPaths(paths);
  }
};
