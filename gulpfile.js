const gulp = require('gulp');
const sass = require('gulp-sass');
const twig = require('gulp-twig');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const gulpSequence = require('gulp-sequence');
const imagemin = require('gulp-imagemin');
const webserver = require('gulp-webserver');

gulp.task('webserver', function() {
    return gulp.src('./build/')
        .pipe(webserver({
            host: 'localhost',
            port: 3000,
            livereload: true,
            open: true,
            fallback: './build/index.html'
        }));
});

gulp.task('sass', function () {
    return gulp.src('./assets/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/assets/css'));
});

gulp.task('cases', function () {
    return gulp.src('./assets/cases/**/*')
        .pipe(gulp.dest('./build/assets/cases'))
});

gulp.task('cases:compress', function () {
    return gulp.src('./assets/cases/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./build/assets/cases'))
});

gulp.task('img', function () {
    return gulp.src('./assets/img/**/*')
        .pipe(gulp.dest('./build/assets/img'))
});

gulp.task('img:compress', function () {
    return gulp.src('./assets/img/**/*')
        .pipe(imagemin())
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

gulp.task('htaccess', function () {
    return gulp.src('./assets/.htaccess')
        .pipe(gulp.dest('./build/'));
});

gulp.task('twig', function () {
    const files = [
        "./assets/twig/index.twig",
        "./assets/twig/spacerace.twig",
        "./assets/twig/csr.twig",
        "./assets/twig/imdb.twig"
    ];

    return gulp.src(files)
        .pipe(twig())
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
    gulp.watch('./assets/**/*', ['default']);
});

gulp.task('default', ['sass', 'js', 'img', 'twig', 'cases', 'htaccess']);
gulp.task('build',  gulpSequence('clean', ['sass', 'js', 'img:compress', 'twig', 'cases:compress', 'htaccess'], ['js:minify', 'css:minify']));