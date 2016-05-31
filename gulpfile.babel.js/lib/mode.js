'use strict';

import {colors} from 'gulp-util';
const {yellow} = colors;

const mandatory = () => {
  throw new Error('Missing parameter: state name');
};

class Mode {
  constructor() {
    this._watching = false;
    this.logState('watching');
  }

  get watching() {
    return this._watching;
  }

  set watching(bool) {
    if (typeof bool !== 'boolean') throw new Error('set true or false as parameter');
    this._watching = bool;
    this.logState('watching');
    return this._watching;
  }

  logState(stateName = mandatory()) {
    console.log(`\n${stateName} mode: ${yellow(this[stateName])}\n`);
  }
}

export default new Mode();
