'use strict';

import del from 'del';
import {destDir, templates, styles, js} from '../config';
import Logger from '../logger';

export default class Cleaner {
  static all() {
    return del([destDir]).then(Logger.logDeleted);
  }

  static html() {
    return del([templates.dest.path]).then(Logger.logDeleted);
  }

  static style() {
    return del([styles.dest.dir]).then(Logger.logDeleted);
  }

  static js() {
    return del([js.dest.dir]).then(Logger.logDeleted);
  }
};
