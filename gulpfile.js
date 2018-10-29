'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');

 
sass.compiler = require('node-sass');
 
gulp.task('sass', function () {
  return gulp.src('app/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
      .pipe(useref())
      .pipe(gulp.dest('public'))
  });

//Watch tasks need to have series attached to it
gulp.task('default', function () {

    browserSync.init({
        server: "public"
    });

    gulp.watch('app/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('app/**/*.html', gulp.series('useref'));
    gulp.watch('public/*.html').on('change', browserSync.reload);
});