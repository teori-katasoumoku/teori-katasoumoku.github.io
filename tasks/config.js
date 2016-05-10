'use strict';

import path from 'path';

const root = path.join(__dirname, '..');
const joint = (...paths) => {
  return path.join(...paths);
};
const src = (...paths) => {
  return joint(root, DIR.src, ...paths);
};
const dest = (...paths) => {
  return joint(root, DIR.dest, ...paths);
};

const DIR = {
  src: 'src',
  dest: 'public',
  templates: 'templates',
  styles: 'styles',
  js: 'js'
};

module.exports = {
  joint: joint,
  root: root,
  src: src(),
  dest: dest(),
  style: {
    src: src(DIR.style, 'main.sass'),
    dest: dest(DIR.style)
  },
  js: {
    src: src(DIR.js),
    dest: dest(DIR.js)
  },
  templates: {
    src: src(DIR.templates, '**', '!(_)*.pug'),
    dest: dest('**', '*.html')
  }
};
