'use strict';

import {debounce} from 'lodash';
import gulpWatch from 'gulp-watch';
import runSequence from 'run-sequence';
import BrowserSync from 'browser-sync';
import bsCloseHook from 'browser-sync-close-hook';

import {templates, styles, images, copy, server} from '../config';
import {logRebuilding as log} from '../lib/log';

const bs = BrowserSync.create(server.name);

bs.use({
  plugin() {},
  hooks: {
    'client:js': bsCloseHook
  }
});

export default function (done) {
  const bs = BrowserSync.get(server.name);

  watch(templates.watch.pattern, 'build:html');
  watch(styles.watch.pattern, ['build:css']);
  watch(images.watch.pattern, ['build:image']);
  watch(copy.src, ['copy']);

  bs.init(server.initOptions, done);
}

function watch(pattern, ...tasks) {
  gulpWatch(pattern, debounce(() => {
    log();
    runSequence(...tasks);
  }, 400));
}
