'use strict';

import path from 'path';

export const ROOT_PATH = path.join(__dirname, '..');

export const DIR_SRC = 'src';
export const DIR_DEST = 'public';
export const DIR_TEMPLATE = 'templates';
export const DIR_CONTENT = 'contents';
export const DIR_STYLE = 'styles';
export const DIR_SCRIPT = 'scripts';
export const DIR_IMAGE = 'images';
export const DIR_FONT = 'fonts';

const joint = (...paths) => path.join(...paths);
const getSrcPath = (...paths) => joint(ROOT_PATH, DIR_SRC, ...paths);
export const getDestPath = (...paths) => joint(ROOT_PATH, DIR_DEST, ...paths);

export const SCRIPT_ENTRY_BASENAME = 'entry';
export const SCRIPT_BUNDLE_BASENAME = 'bundle';

export const DOC_FILES = [
  'README.md',
  'LICENSE',
  'circle.yml'
];

export const SRC_PATH = getSrcPath();
export const SRC_PATH_CONTENT = getSrcPath(DIR_CONTENT, '**', '*.+(yml|yaml)');
export const SRC_PATH_STYLE = getSrcPath(DIR_STYLE, 'main.scss');
export const SRC_PATH_SCRIPT = getSrcPath(DIR_SCRIPT, `${SCRIPT_ENTRY_BASENAME}.js`);
export const SRC_PATH_IMAGE = getSrcPath(DIR_IMAGE, '**', '*.+(jpg|jpeg|gif|png|svg)');
export const SRC_PATH_FONT = getSrcPath(DIR_FONT, '**', '*');
export const SRC_PATHS_DOC = DOC_FILES.map(file => joint(ROOT_PATH, file));

export const DEST_PATH = getDestPath();
export const DEST_PATH_CONTENT = getDestPath();
export const DEST_PATH_STYLE = getDestPath(DIR_STYLE);
export const DEST_PATH_SCRIPT = getDestPath(DIR_SCRIPT);
export const DEST_PATH_IMAGE = getDestPath(DIR_IMAGE);
export const DEST_PATH_FONT = getDestPath(DIR_FONT);
export const DEST_PATH_DOC = getDestPath();

export const WATCH_PATTERN_TEMPLATE = getSrcPath(DIR_TEMPLATE, '**', '*.pug');
export const WATCH_PATTERN_CONTENT = getSrcPath(DIR_CONTENT, '**', '*.+(yml|yaml)');
export const WATCH_PATTERN_STYLE = getSrcPath(DIR_STYLE, '**', '*.+(css|scss|sass)');
export const WATCH_PATTERN_IMAGE = getSrcPath(DIR_IMAGE, '**', '*.+(jpg|jpeg|gif|png|svg)');
export const WATCH_PATTERN_FONT = SRC_PATH_FONT;
export const WATCH_PATTERNS_DOC = SRC_PATHS_DOC;

// BrowserSync
export const BS_SERVER_NAME = 'local-server';
export const BS_INIT_OPTIONS = {
  // https://www.browsersync.io/docs/options/
  server: {
    baseDir: DEST_PATH,
    directory: true
  },
  browser: ['google chrome'], //'google chrome', 'firefox', 'safari'
  reloadOnRestart: true,
  reloadDelay: 100,
  reloadDebounce: 100
};

// notice
export const NOTICE_ERROR_FORMAT = 'Error: <%= error.message %>';

// deploy
export const DEPLOY_TARGET_PATTERN = getDestPath('**', '*');
export const DEPLOY_TARGET_BRANCH = 'master';
