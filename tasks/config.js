'use strict';

import path from 'path';
import deepFreeze from 'deep-freeze';

const root = path.join(__dirname, '..');
const dir = {
  src: 'src',
  dest: 'public',
  templates: 'templates',
  styles: 'styles',
  js: 'js',
  images: 'images'
};

const pathConfig = {
  templates: {
    src: {
      dir: srcPath(dir.templates),
      file: joint('**', '!(_)*.pug')
    },
    dest: {
      dir: destPath(),
      file: joint('**', '*.html')
    },
    watch: {
      pattern: srcPath(dir.templates, '**', '*.pug')
    }
  },
  styles: {
    src: {
      dir: srcPath(dir.styles),
      file: 'main.sass'
    },
    dest: {
      dir: destPath(dir.styles),
      file: ''
    },
    watch: {
      pattern: srcPath(dir.styles, '**', '*.+(sass|scss|css)')
    }
  },
  js: {
    src: {
      dir: srcPath(dir.js),
      file: 'entry.js'
    },
    dest: {
      dir: destPath(dir.js),
      file: 'bundle.js'
    },
    watch: {
      pattern: srcPath(dir.js, '**', '*.js')
    }
  },
  images: {
    src: {
      dir: srcPath(dir.images),
      file: joint('**', '*.+(jpg|jpeg|gif|png|svg)')
    },
    dest: {
      dir: destPath(dir.images),
      file: ''
    },
    watch: {
      pattern: srcPath(dir.images, '**', '*.+(jpg|jpeg|gif|png|svg)')
    }
  }
};

const serverConfig = {
  name: 'local-server',
  initOptions: {
    // https://www.browsersync.io/docs/options/
    server: {
      baseDir: destPath()
    },
    browser: ['google chrome'], //'google chrome', 'firefox', 'safari'
    reloadOnRestart: true,
    reloadDelay: 100,
    reloadDebounce: 100
  }
};

const noticeConfig = {
  errorFormat: 'Error: <%= error.message %>'
};

Object.keys(pathConfig).forEach(key => {
  const targets = [pathConfig[key].src, pathConfig[key].dest];
  targets.forEach(target => {
    Object.defineProperty(target, 'path', {
      get: function () { return joint(this.dir, this.file); }
    });
  });
});

deepFreeze(pathConfig);
deepFreeze(noticeConfig);

export {joint};
export const rootDir = root;
export const srcDir = srcPath();
export const destDir = destPath();
export const templates = pathConfig.templates;
export const styles = pathConfig.styles;
export const js = pathConfig.js;
export const images = pathConfig.images;
export const server = serverConfig;
export const notice = noticeConfig;

function joint(...paths) {
  return path.join(...paths);
}
function srcPath(...paths) {
  return joint(root, dir.src, ...paths);
}
function destPath(...paths) {
  return joint(root, dir.dest, ...paths);
}
