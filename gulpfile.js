const gulp = require('gulp');
const sass = require('gulp-sass');
const twig = require('gulp-twig');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');

gulp.task('sass', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('img', function () {
    return gulp.src('./assets/img/**/*')
        .pipe(gulp.dest('./build/assets/img'))
});

gulp.task('video', function () {
    return gulp.src('./assets/video/**/*')
        .pipe(gulp.dest('./build/assets/video'))
});

gulp.task('js', function () {
    return gulp.src('./assets/js/**/*.js')
        .pipe(gulp.dest('./build/assets/js'))
});

gulp.task('js:minify', () => {
    return gulp.src('./build/assets/js/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/assets/js'))
});

gulp.task('css:minify',() => {
    return gulp.src('./build/assets/css/**/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./build/assets/css'));
});


gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});

gulp.task('twig', function () {
    const files = [
        "./assets/twig/index.twig",
        "./assets/twig/contact.twig",
        "./assets/twig/spacerace.twig",
        "./assets/twig/imdb.twig"
    ];

    return gulp.src(files)
        .pipe(twig())
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/**/*', ['default']);
});

gulp.task('default', ['sass', 'js', 'img', 'twig', 'video']);
gulp.task('build', ['clean', 'sass', 'js', 'img', 'twig', 'video']);