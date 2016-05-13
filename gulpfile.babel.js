'use strict';

import gulp from 'gulp';

import mode from './tasks/mode';
import {reformatGulpLog} from './tasks/log';
import {cleanAll, cleanHtml, cleanJs, cleanStyle} from './tasks/gulp/clean';
import watch from './tasks/gulp/watch';
import buildHtml from './tasks/gulp/build-html';
import buildCss from './tasks/gulp/build-css';
import buildJs from './tasks/gulp/build-js';

reformatGulpLog();

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'build:html',
  'build:js',
  'build:css'
]);

gulp.task('clean:all', cleanAll);
gulp.task('clean:html', cleanHtml);
gulp.task('clean:style', cleanStyle);
gulp.task('clean:js', cleanJs);

gulp.task('build:html', ['clean:html'], buildHtml);
gulp.task('build:css', ['build:html', 'clean:style'], buildCss);
gulp.task('build:js', ['clean:js'], buildJs);

gulp.task('watch:prod', ['build'], watch);
gulp.task('watch:dev', ['enable-watching', 'build'], watch);

gulp.task('enable-watching', (done) => {
  mode.watching = true;
  done();
});

gulp.task('disable-watching', (done) => {
  mode.watching = false;
  done();
});

