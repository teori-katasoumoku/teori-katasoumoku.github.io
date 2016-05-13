'use strict';

import {debounce} from 'lodash';
import gulpWatch from 'gulp-watch';
import runSequence from 'run-sequence';
import BrowserSync from 'browser-sync';
import bsCloseHook from 'browser-sync-close-hook';

import {templates, styles, server} from '../config';

const bs = BrowserSync.create(server.name);

bs.use({
  plugin() {},
  hooks: {
    'client:js': bsCloseHook
  }
});

export default function (done) {

  gulpWatch(templates.watch.pattern, debounce(() => {
    runSequence('build:html', 'build:css');
  }, 400));

  gulpWatch(styles.watch.pattern, debounce(() => {
    runSequence(['build:css']);
  }, 400));

  bs.init(server.initOptions, done);
}
