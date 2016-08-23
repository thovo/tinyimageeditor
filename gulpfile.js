'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

gulp.task('default', ['build', 'sass', 'views', 'connect'], function() {
    gulp.watch(['./src/scripts/**/*.js',
        './src/style/**/*.scss',
        './src/views/**/*.pug'
    ], ['build', 'sass', 'views']);

});

gulp.task('views', function() {
  return gulp.src('./src/views/*.pug')
  .pipe(pug({
    // Your options in here.
  }))
  .pipe(gulp.dest('./dist'));
});

gulp.task('build', function() {
    return gulp.src(['./src/scripts/**/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src('./src/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8080
    });
});
