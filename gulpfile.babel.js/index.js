'use strict';

import gulp from 'gulp';

import mode from './lib/mode';
import {reformatGulpLog} from './lib/log';
import watch from './tasks/watch';
import buildHtml, {cleanHtml} from './tasks/build-html';
import buildStyle, {cleanStyle} from './tasks/build-style';
import buildScript, {cleanScript} from './tasks/build-script';
import buildImage, {cleanImage} from './tasks/build-image';
import {copyFont, copyDoc, cleanCopiedFont, cleanCopiedDoc} from './tasks/copy';
import deploy from './tasks/deploy';

reformatGulpLog();

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'build:html',
  'build:script',
  'build:style',
  'build:image',
  'copy'
]);

gulp.task('clean:all', ['clean:html', 'clean:style', 'clean:script', 'clean:image', 'clean:copiedFont', 'clean:copiedDoc']);
gulp.task('clean:html', cleanHtml);
gulp.task('clean:style', cleanStyle);
gulp.task('clean:script', cleanScript);
gulp.task('clean:image', cleanImage);
gulp.task('clean:copiedFont', cleanCopiedFont);
gulp.task('clean:copiedDoc', cleanCopiedDoc);

gulp.task('build:html', ['clean:html'], buildHtml);
gulp.task('build:style', ['build:html', 'clean:style'], buildStyle);
gulp.task('build:script', ['clean:script'], buildScript);
gulp.task('build:image', ['clean:image'], buildImage);
gulp.task('copy', [
  'copy:font',
  'copy:doc'
]);
gulp.task('copy:font', ['clean:copiedFont'], copyFont);
gulp.task('copy:doc', ['clean:copiedDoc'], copyDoc);

gulp.task('watch:prod', ['enable-prod', 'disable-watching', 'build'], watch);
gulp.task('watch:dev', ['disable-prod', 'enable-watching', 'build'], watch);

gulp.task('deploy', ['build'], deploy);

gulp.task('enable-prod', (done) => {
  mode.prod = true;
  done();
});

gulp.task('disable-prod', (done) => {
  mode.prod = false;
  done();
});

gulp.task('enable-watching', (done) => {
  mode.watching = true;
  done();
});

gulp.task('disable-watching', (done) => {
  mode.watching = false;
  done();
});
