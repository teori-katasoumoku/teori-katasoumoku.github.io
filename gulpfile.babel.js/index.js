'use strict';

import gulp from 'gulp';

import mode from './lib/mode';
import {reformatGulpLog} from './lib/log';
import watch from './tasks/watch';
import {cleanHtml, cleanJs, cleanStyle, cleanImages, cleanCopiedSrc, cleanCopiedDoc} from './tasks/clean';
import buildHtml from './tasks/build-html';
import buildCss from './tasks/build-css';
import buildJs from './tasks/build-js';
import buildImage from './tasks/build-image';
import {copySrc, copyDoc} from './tasks/copy';
import deploy from './tasks/deploy';

reformatGulpLog();

gulp.task('default', [
  'watch:dev'
]);

gulp.task('build', [
  'clean:all',
  'build:html',
  'build:js',
  'build:css',
  'build:image',
  'copy'
]);

gulp.task('clean:all', ['clean:html', 'clean:style', 'clean:js', 'clean:image', 'clean:copiedSrc', 'clean:copiedDoc']);
gulp.task('clean:html', cleanHtml);
gulp.task('clean:style', cleanStyle);
gulp.task('clean:js', cleanJs);
gulp.task('clean:image', cleanImages);
gulp.task('clean:copiedSrc', cleanCopiedSrc);
gulp.task('clean:copiedDoc', cleanCopiedDoc);

gulp.task('build:html', ['clean:html'], buildHtml);
gulp.task('build:css', ['build:html', 'clean:style'], buildCss);
gulp.task('build:js', ['clean:js'], buildJs);
gulp.task('build:image', ['clean:image'], buildImage);
gulp.task('copy', [
  'copy:src',
  'copy:doc'
]);
gulp.task('copy:src', ['clean:copiedSrc'], copySrc);
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
