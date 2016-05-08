'use strict';

import path from 'path';

const root = path.join(__dirname, '..');
const joint = (...paths) => {
  return path.join(root, ...paths);
};
const src = (...paths) => {
  return joint(DIR.src, ...paths);
};
const dest = (...paths) => {
  return joint(DIR.dest, ...paths);
};

const DIR = {
  src: 'src',
  dest: 'public',
  templates: 'templates',
  style: 'style',
  js: 'js'
};

module.exports = {
  joint: joint,
  src: src(),
  dest: dest(),
  style: {
    src: src(DIR.style),
    dest: dest(DIR.style)
  },
  js: {
    src: src(DIR.js),
    dest: dest(DIR.js)
  },
  templates: {
    src: src(DIR.templates, '**', '!(_)*.pug')
  }
};
