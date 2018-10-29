'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

 
sass.compiler = require('node-sass');
 
//Compiles Sass and Sends to BrowserSync
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

//Builds the public HTML
gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulp.dest('public'))
  });

//Copies Index to home directory
gulp.task('prod-build', function(){
    return gulp.src('public/*.html')
      .pipe(useref())
      .pipe(gulp.dest('.'))
  });

//Copies css to home directory
gulp.task('prod-build-css', function(){
    return gulp.src('public/*.css')
      .pipe(useref())
      .pipe(gulp.dest('.'))
  });

//Minifys the Sass Compiled CSS file
gulp.task('css-min', function(){
    return gulp.src('public/*.css')
      .pipe(useref())
      // Minifies only if it's a CSS file
      .pipe(gulpIf('*.css', cssnano()))
      .pipe(gulp.dest('public'))
  });

//Builds the files
gulp.task('build', function(){
    return gulp.series('sass', 'css-min', 'useref');
  });

//Builds Prod files
gulp.task('production-build', function(){
    gulp.series('prod-build', 'prod-build-css');
    return ;
  });
//Builds the files
gulp.task('build', function(){
    return gulp.series('sass', 'css-min', 'useref');
  });

//Watch tasks need to have series attached to it
gulp.task('default', function () {
    gulp.series('build');

    browserSync.init({
        server: "public"
    });

    gulp.watch('app/sass/**/*.scss', gulp.series('sass', 'css-min', 'prod-build-css'));
    gulp.watch('public/*.css', gulp.series('prod-build-css'));
    gulp.watch('app/**/*.html', gulp.series('useref', 'prod-build'));
    gulp.watch('public/*.html').on('change', browserSync.reload);
});