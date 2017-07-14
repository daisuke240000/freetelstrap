gulp = require('gulp')
rimraf = require('rimraf').sync
# wwwフォルダをけす。
gulp.task 'clean', ->
  rimraf './www/'
return
