'use strict';

const path = require('path');
const root = (...paths) => {
  return path.join(__dirname, '..', ...paths);
};
const DIR = {
  src: 'src',
  dest: 'public'
};

module.exports = {
  src: (...paths) => {
    return root(DIR.src, ...paths);
  },
  dest: (...paths) => {
    return root(DIR.dest, ...paths);
  }
};
