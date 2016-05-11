'use strict';

import path from 'path';

const rootPath = path.join(__dirname, '..');
const srcPath = (...paths) => {
  return joint(rootPath, DIR.src, ...paths);
};
const destPath = (...paths) => {
  return joint(rootPath, DIR.dest, ...paths);
};

const DIR = {
  src: 'src',
  dest: 'public',
  templates: 'templates',
  styles: 'styles',
  js: 'js'
};

export const joint = (...paths) => {
  return path.join(...paths);
};
export const ROOT = rootPath;
export const SRC = srcPath();
export const DEST = destPath();
export const styles = {
  SRC: srcPath(DIR.styles, 'main.sass'),
  DEST: destPath(DIR.styles),
  WATCH_FILES: srcPath(DIR.styles, '**', '*.+(sass|scss|css)')
};
export const js = {
  SRC: srcPath(DIR.js, 'main.js'),
  DEST: destPath(DIR.js),
  WATCH_FILES: srcPath(DIR.js, '**', '*.js')
};
export const templates = {
  SRC: srcPath(DIR.templates, '**', '!(_)*.pug'),
  DEST: destPath('**', '*.html'),
  WATCH_FILES: srcPath(DIR.templates, '**', '*.pug')
};
