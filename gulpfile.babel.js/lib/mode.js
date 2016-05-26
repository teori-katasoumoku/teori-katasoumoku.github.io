'use strict';

class Mode {
  constructor() {
    this._watching = false;
    console.log('\nwatching mode: false\n');
  }

  get watching() {
    return this._watching;
  }

  set watching(value) {
    this._watching = value;
    console.log('\nwatching mode: true\n');
    return this._watching
  }
}

export default new Mode();
