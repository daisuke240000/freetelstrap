module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    clean: {
      options: {
        force: true
      },
      all: ['./www/']
    },

    sass: {
        options: {
          outputStyle: 'nested',
          sourceMap: true,
          precision: 5,
          includePaths: [
              "node_modules"
          ]
        },
        dist: {
          files: {
            './www/css/freetelstrap.css': './src/scss/freetelstrap.scss',
          }
        }
    },

    //  Minify CSS
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './www/css',
          src: ['*.css', '!*.min.css'],
          dest: './www/css/',
          ext: '.min.css'
        }]
      }
    },

    // Copy files
    copy: {

      //  Copy distribution assets from src folder to dist
      dist:{
        files:[
          {
            expand: true,
            cwd: './src/fonts/',
            src: '**',
            dest: './www/fonts/'
          },
          //  Copy vendor js to www
          {
            expand: true,
            cwd: 'node_modules/jquery/dist/',
            src: ['jquery.min.js', 'jquery.min.map'],
            dest: 'www/js/vendor/'
          },
          {
            expand: true,
            cwd: 'node_modules/bootstrap-sass/assets/javascripts/',
            src: 'bootstrap.min.js',
            dest: 'www/js/vendor/'
          },
          {
            expand: true,
            cwd: './src/fonts/',
            src: '**',
            dest: './www/fonts/'
          },
          {
            expand: true,
            cwd: './src/images/',
            src: '*',
            dest: './www/images/'
          }
        ]
      },
      //  Copy css and js from src to www
      doc: {
        files: [
          {
            expand: true,
            cwd: './src/js/',
            src: '*.js',
            dest: './www/js/'
          },
          {
            expand: true,
            cwd: './src/js/vendor/',
            src: ['*.js', '*.map'],
            dest: './www/js/vendor/'
          }
        ]
      }
    },

    // Build the main HTML files of the style guide
    assemble: {
      options: {
        partials: ['./src/html/partials/**/*.hbs'],
        layout: ['./src/html/layouts/default.hbs'],
        helpers: ['./node_modules/handlebars-helpers/*.js'],
        flatten: true,
        data: './src/html/data/*.json',

        // Set the version number
        version: '<%= pkg.version %>',

        // Name of the project
        name: '<%= pkg.name %>',
      },
      pages: {
        src: ['./src/html/*.hbs'],
        dest: './www/'
      }
    },

    // Watch javascript and css files of the style guide
    watch: {
      sass: {
        files: './src/scss/**/*.scss',
        tasks: ['sass']
      },
      cssmin: {
        files: ['./dist/css/**.css', '!./dist/css/**.min.css'],
        tasks: ['cssmin', 'copy:doc']
      },
      doc: {
        files: ['./src/html/**/*', './src/js/*.js'],
        tasks: ['jshint', 'assemble', 'copy:doc']
      },
      configFiles: {
        files: ['gruntfile.js'],
        options: {
          reload: true
        }
      },
      options: {
        livereload: true,
        tasks: ['notify:assemble']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: ['./', './www/'],
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    },

    bump: {
      options: {
        files: ['./package.json'],
        commit: false,
        // commitMessage: 'Release version %VERSION%',
        // commitFiles: ['package.json'],
        updateConfigs: ['pkg'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        // pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
    notify: {
      server: {
        options: {
          title: 'freetelstrap',
          message: 'Server started'
        },
      },
      watch: {
        options: {
          title: 'freetelstrap',
          message: 'assemble completed', //required
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-notify');

  grunt.registerTask('default', ['clean','sass','cssmin','bump','assemble','copy']);
  grunt.registerTask('server', ['connect', 'notify:server', 'watch']);
};
