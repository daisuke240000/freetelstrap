var gulp = require('gulp');
var rimraf = require('rimraf').sync;

// wwwフォルダをけす。
gulp.task('clean', function() {
  rimraf('./www/');
});
