'use strict';

import debounce from 'lodash.debounce';
import gulpWatch from 'gulp-watch';
import runSequence from 'run-sequence';
import BrowserSync from 'browser-sync';
import bsCloseHook from 'browser-sync-close-hook';

import {logRebuilding as log} from '../lib/log';

import {
  WATCH_PATTERN_TEMPLATE,
  WATCH_PATTERN_CONTENT,
  WATCH_PATTERN_STYLE,
  WATCH_PATTERN_IMAGE,
  WATCH_PATTERN_FONT,
  WATCH_PATTERNS_DOC,
  BS_SERVER_NAME,
  BS_INIT_OPTIONS
} from '../config';

const bs = BrowserSync.create(BS_SERVER_NAME);

bs.use({
  plugin() {},
  hooks: {
    'client:js': bsCloseHook
  }
});

export default function (done) {
  watch(WATCH_PATTERN_TEMPLATE, 'build:html');
  watch(WATCH_PATTERN_CONTENT, 'build:html');
  watch(WATCH_PATTERN_STYLE, 'build:style');
  watch(WATCH_PATTERN_IMAGE, 'build:image');
  watch(WATCH_PATTERN_FONT, 'copy:font');
  watch(WATCH_PATTERNS_DOC, 'copy:doc');

  bs.init(BS_INIT_OPTIONS, done);
}

function watch(pattern, ...tasks) {
  gulpWatch(pattern, debounce(() => {
    log();
    runSequence(...tasks);
  }, 400));
}
