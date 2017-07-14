var gulp = require("gulp");
var requireDir = require('require-dir');
requireDir('./gulptask');
gulp.task('default', ['clean','copy']);
