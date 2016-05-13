'use strict';

import gulp from 'gulp';

import mode from './tasks/mode';
import Logger from './tasks/logger';
import cleaner from './tasks/gulp/cleaner';
import watch from './tasks/gulp/watch';
import buildHtml from './tasks/gulp/build-html';
import buildCss from './tasks/gulp/build-css';
import buildJs from './tasks/gulp/build-js';

Logger.reformatGulpLog();

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'build:html',
  'build:js',
  'build:css'
]);

gulp.task('clean:all', cleaner.all);
gulp.task('clean:html', cleaner.html);
gulp.task('clean:style', cleaner.style);
gulp.task('clean:js', cleaner.js);

gulp.task('build:html', ['clean:html'], () => {
  return buildHtml();
});

gulp.task('build:css', ['build:html', 'clean:style'], () => {
  return buildCss();
});

gulp.task('build:js', ['clean:js'], () => {
  return buildJs();
});

gulp.task('enable-watching', (done) => {
  mode.watching = true;
  done();
});

gulp.task('disable-watching', (done) => {
  mode.watching = false;
  done();
});

gulp.task('watch:prod', ['build'], watch);
gulp.task('watch:dev', ['enable-watching', 'build'], watch);
