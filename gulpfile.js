var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');

gulp.task('minify', function(){
    gulp.src('./htdocs/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./htdocs/prod/css'));
});

gulp.task('less', function(){
    gulp.src('./htdocs/less/*.less')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')//デスクトップに通知
    })) //lessのコンパイルでこけても終了しない
    .pipe(less())
    .pipe(gulp.dest('./htdocs/css'));
});

gulp.task('watch', function(){
    gulp.watch('./htdocs/less/*.less', ['less']);
});

gulp.task('default', ['less']);
