'use strict';

import gulp from 'gulp';

import mode from './lib/mode';
import {reformatGulpLog} from './lib/log';
import {cleanAll, cleanHtml, cleanJs, cleanStyle, cleanImages, cleanCopied} from './tasks/clean';
import watch from './tasks/watch';
import buildHtml from './tasks/build-html';
import buildCss from './tasks/build-css';
import buildJs from './tasks/build-js';
import buildImage from './tasks/build-image';
import copy from './tasks/copy';
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

gulp.task('clean:all', cleanAll);
gulp.task('clean:html', cleanHtml);
gulp.task('clean:style', cleanStyle);
gulp.task('clean:js', cleanJs);
gulp.task('clean:image', cleanImages);
gulp.task('clean:copied', cleanCopied);

gulp.task('build:html', ['clean:html'], buildHtml);
gulp.task('build:css', ['build:html', 'clean:style'], buildCss);
gulp.task('build:js', ['clean:js'], buildJs);
gulp.task('build:image', ['clean:image'], buildImage);
gulp.task('copy', ['clean:copied'], copy);

gulp.task('watch:prod', ['build'], watch);
gulp.task('watch:dev', ['enable-watching', 'build'], watch);

gulp.task('deploy', ['build'], deploy);

gulp.task('enable-watching', (done) => {
  mode.watching = true;
  done();
});

gulp.task('disable-watching', (done) => {
  mode.watching = false;
  done();
});
