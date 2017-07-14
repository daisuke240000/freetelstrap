gulp = require('gulp')
handlebars = require('handlebars')
gulpHandlebars = require('gulp-compile-handlebars')
rename = require('gulp-rename')

handlebars.registerPartial 'footer', '<footer>the end</footer>'
handlebars.registerHelper 'capitals', (str) ->
  str.toUpperCase()
gulp.task 'assemble', ->
  templateData = firstName: 'Kaanon'
  options = partialsDirectory: [ './src/html/partials' ]

  gulp.src([
    #'src/html/index.hbs'
    #'src/html/sample/index2.hbs'
    'src/html/**/*.hbs'
    '!src/html/data/**/*'
    '!src/html/layouts/**/*'
    '!src/html/partials/**/*'
    ],
    base: 'src/html'
  )
    .pipe(gulpHandlebars(templateData, options))
    .pipe(rename(extname:'.html'))
    .pipe gulp.dest('dist')
