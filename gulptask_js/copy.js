var gulp = require('gulp');

// コピーする
gulp.task('copy', function() {
  gulp.src('./src/fonts/**')
    .pipe(gulp.dest('./www/fonts/'));
});
