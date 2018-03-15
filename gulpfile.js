'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const twig = require('gulp-twig');

gulp.task('sass', function () {
    return gulp.src('./src/assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('img', function () {
    return gulp.src('./src/assets/img/**/*')
        .pipe(gulp.dest('./build/assets/img'))
});

gulp.task('js', function () {
    return gulp.src('./src/assets/js/**/*')
        .pipe(gulp.dest('./build/assets/img'))
});

gulp.task('twig', function () {
    const files = [
        "./src/assets/twig/index.twig"
    ];

    return gulp.src(files)
        .pipe(twig({
            data: {}
        }))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/assets/**/*', ['build']);
});

gulp.task('default', ['sass', 'js', 'img', 'twig']);
gulp.task('build', ['sass', 'js', 'img', 'twig']);