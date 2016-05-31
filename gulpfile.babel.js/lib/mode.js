'use strict';

import {colors} from 'gulp-util';
const {yellow} = colors;

const mandatory = () => {
  throw new Error('Missing parameter: state name');
};

const ENV = {
  prod: 'production',
  dev: 'development'
};

class Mode {
  constructor() {
    this.prod = true;
    this._watching = false;
    this.watching = this._watching;
  }

  get watching() {
    return this._watching;
  }

  set watching(bool) {
    if (typeof bool !== 'boolean') throw new Error('set true or false as parameter');
    this._watching = bool;
    this.logState('watching');
    return this.watching;
  }

  get env() {
    return process.env.NODE_ENV;
  }

  get prod() {
    return process.env.NODE_ENV === ENV['prod'];
  }

  set prod(bool) {
    if (typeof bool !== 'boolean') throw new Error('set true or false as parameter');
    process.env.NODE_ENV = bool ? ENV['prod'] : ENV['dev'];
    this.logState('env');
    return this.prod;
  }

  logState(stateName = mandatory()) {
    console.log(`\n${stateName}: ${yellow(this[stateName])}\n`);
  }
}

export default new Mode();
