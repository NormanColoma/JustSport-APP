module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js','./app/**/*.js','./routes/*.js','./test/**/*.js'],
            options: {
                globals: {
                    jQuery: true
                }
            }
        },
        ngAnnotate: { //Look for angular dependencies, and inject them into the files
            options: {
                singleQuotes: true,
            },
            app: {
                files: [
                    {
                        expand: true,
                        src: ['app/**/*.js'],
                        ext: '.js', // Dest filepaths will have this extension.
                        extDot: 'last',       // Extensions in filenames begin after the last dot
                    },
                ],
            },
        },
        uglify: {
            app: {
                files: {
                    'app/app.min.js': ['app/sports/sport.module.js', 'app/sports/sportList.controller.js',
                        'app/services/sportList.service.js', 'app/home/home.module.js', 'app/home/scrollTo.directive.js',
                        'app/home/home.controller.js','app/app.module.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        watch: {
            files: ['app/**/*.js'],
            tasks: ['ngAnnotate', 'uglify']
        }
    });

    grunt.registerTask('build', ['jshint']);
    grunt.registerTask('unit-test', ['karma:unit']);

};
