'use strict';

import path from 'path';

import {colors} from 'gulp-util';
const {magenta} = colors;

import {root} from './config';

module.exports =  {
  logPaths: (paths) => {
    if (paths.length === 0) {
      return console.log('Nothing.');
    }
    paths.forEach(p => {
      p = path.relative(root, p);
      console.log(colors.magenta(p));
    });
  }
};
