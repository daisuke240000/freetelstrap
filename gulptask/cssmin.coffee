gulp = require('gulp')
cssmin = require('gulp-cssmin')
rename = require('gulp-rename')
gulp.task 'cssmin', ->
  return gulp.src('./www/css/*.css')
  .pipe(cssmin())
  .pipe(rename(suffix: '.min'))
  .pipe gulp.dest('./www/css/')
