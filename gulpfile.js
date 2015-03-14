var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var minifyCSS = require('gulp-minify-css');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var ejs = require('gulp-ejs');

gulp.task('minify', function(){
    gulp.src('./htdocs/css/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('./htdocs/prod/css'));
});

gulp.task('ejs', function(){
    gulp.src(['./htdocs/ejs/**/*.ejs', '!' + './htdocs/ejs/**/_*.ejs'])
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')//デスクトップに通知
    }))
    .pipe(ejs())
    .pipe(gulp.dest('./htdocs/prod'));
});

gulp.task('less', function(){
    gulp.src('./htdocs/less/*.less')
    .pipe(plumber({
        errorHandler: notify.onError('Error: <%= error.message %>')//デスクトップに通知
    })) //lessのコンパイルでこけても終了しない
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./htdocs/css'));
});

gulp.task('watch', function(){
    gulp.watch('./htdocs/less/*.less', ['less']);
    gulp.watch(['./htdocs/ejs/**/*.ejs', '!' + './htdocs/ejs/**/_*.ejs'], ['ejs']);
});

gulp.task('default', ['watch']);
