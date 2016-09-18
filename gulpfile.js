'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var notify = require('gulp-notify');
var size = require('gulp-size');

gulp.task('default', ['build', 'sass', 'views', 'connect'], function() {
    gulp.watch(['./src/scripts/**/*.js',
        './src/style/**/*.scss',
        './src/views/**/*.pug'
    ], ['build', 'sass', 'views', 'projectSize']);
});



gulp.task('projectSize', ['build-product', 'sass-product', 'views-product'], function() {
    var s = size();
    return gulp.src('./dist_product/**/*.*')
        .pipe(s)
        .pipe(notify({
            onLast: true,
            message: function() {
                if (s.size > 10000) {
                    return `Total size ${s.prettySize}`;
                }
            }
        }));
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
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('sass', function() {
    return gulp.src('./src/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        port: 8080
    });
});

/***************************DEPLOY****************************/

gulp.task('views-product', function() {
    return gulp.src('./src/views/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./dist_product'));
});

gulp.task('build-product', function() {
    return gulp.src(['./src/scripts/**/*.js'])
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist_product'));
});

gulp.task('sass-product', function() {
    return gulp.src('./src/style/main.scss')
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(gulp.dest('./dist_product'));
});

/*******************************************************/
