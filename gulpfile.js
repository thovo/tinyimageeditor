'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('default', ['build', 'sass', 'connect'], function() {
    gulp.watch(['./src/scripts/**/*.js',
        './src/style/**/*.scss'
    ], ['build', 'sass']);

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
