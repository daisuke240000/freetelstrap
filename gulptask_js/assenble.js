var gulp = require('gulp');
var handlebars = require('handlebars');
var gulpHandlebars = require('gulp-compile-handlebars')(handlebars); //default to require('handlebars') if not provided
var rename = require('gulp-rename');

handlebars.registerPartial('footer', '<footer>the end</footer>');
handlebars.registerHelper('capitals', function(str){
  return str.toUpperCase();
});

gulp.task('assemble', function () {
    var templateData = {
        firstName: 'Kaanon'
    },
    options = {
        partialsDirectory : ['./src/html/partials']
    }

    return gulp.src('src/html/index.hbs')
        .pipe(gulpHandlebars(templateData, options))
        .pipe(rename('hello.html'))
        .pipe(gulp.dest('dist'));
});
