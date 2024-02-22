const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

function styles() {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(gulp.dest('dist/css'));
}

function scripts() {
    return gulp
        .src('src/js/**/*.js')
        .pipe(uglify())
        .pipe(
            rename({
                suffix: '.min',
            })
        )
        .pipe(gulp.dest('dist/js'));
}

function watch() {
    gulp.watch('src/scss/**/*.scss', styles);
    gulp.watch('src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;

exports.default = gulp.parallel(styles, scripts, watch);
