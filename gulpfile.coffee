gulp = require('gulp')
requireDir = require('require-dir')
runSequence = require('run-sequence')
requireDir './gulptask'
# gulp.task 'default', [
#   runSequence
#   'clean'
#   'sass'
#   'cssmin'
#   'copy'
# ]
gulp.task 'default', (callback) ->
  runSequence 'clean','sass','cssmin','assemble','copy', callback
  return
