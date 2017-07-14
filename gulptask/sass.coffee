fs = require('fs')
gulp = require('gulp')
sass = require('gulp-sass')
plumber = require('gulp-plumber')
sourcemaps = require('gulp-sourcemaps')
sassLint = require('gulp-sass-lint')
postcss = require('gulp-postcss')
autoprefixer = require('autoprefixer')

gulp.task 'sass', ->
  return gulp.src('./src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(sass(includePaths: 'node_modules').on('error', sass.logError))
  .pipe(postcss([ autoprefixer(browsers: [
    'last 2 versions'
    'ie >= 9'
    'Android >= 2.3'
    'ios >= 7'
  ]) ]))
  .pipe(sourcemaps.write('.'))
  .pipe gulp.dest('./www/css/')
