'use strict';

import del from 'del';
import {destDir, templates, styles, js} from '../config';
import {logDeleted} from '../log';

export function cleanAll() {
  return del([destDir]).then(logDeleted);
}

export function cleanHtml() {
  return del([templates.dest.path]).then(logDeleted);
}

export function cleanStyle() {
  return del([styles.dest.dir]).then(logDeleted);
}
export function cleanJs() {
  return del([js.dest.dir]).then(logDeleted);
}
