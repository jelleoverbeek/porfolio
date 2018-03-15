'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/assets/scss/**/*.scss', ['sass']);
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            open: true
        }));
});

gulp.task('default', ['sass']);
gulp.task('build', ['sass']);