var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rename = require('gulp-rename');

gulp.task('scss', function() {
    return gulp.src(['vendor/*.css', 'src/*.scss'])
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
    return gulp.src(['vendor/*.js', 'src/*.js'])
        .pipe(concat('script.min.js'))
        .pipe(uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('dist'));
});

gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(minifyHtml({ comments: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
    return gulp.src(['src/*.png', 'src/*.ico'])
        .pipe(gulp.dest('dist'));
});

gulp.task('lua', function() {
    return gulp.src('src/api.lua')
        .pipe(rename('api'))
        .pipe(gulp.dest('dist/cgi-bin'));
});

gulp.task('default', ['scss', 'js', 'html', 'images', 'lua']);