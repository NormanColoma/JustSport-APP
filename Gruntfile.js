module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js','./app/**/*.js','./routes/*.js','./test/**/*.js', '!./app/app.min.js'],
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
                        'app/services/sportList.service.js', 'app/home/home.module.js', 'app/components/scrollTo.directive.js',
                        'app/components/filteredResults.directive.js', 'app/services/establishmentFiltered.service.js',
                        'app/services/citySuggestions.service.js','app/home/home.controller.js', 'app/home/establishmentFiltered.controller.js',
                        'app/app.module.js', 'test/app/app.test.js', 'test/app/citySuggestions.module.test.js',
                        'test/app/sports.module.test.js', 'test/app/estabsFiltered.module.test.js']
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        shell: {
            start_server: {
                command: 'node bin/www.js'
            },
            e2e_test: {
                command: 'protractor protractor.conf.js'
            }
        },
        express: {
            options: {
                port: 5000,
            },
            test: {
                options: {
                    script: 'bin/www.js',
                    node_env: 'test'
                }
            }
        },
        watch: {
            files: ['app/**/*.js','test/app/**/*.js'],
            tasks: ['uglify']
        }
    });

    grunt.registerTask('build', ['jshint', 'unit-test', 'e2e-test']);
    grunt.registerTask('unit-test', ['karma:unit']);
    grunt.registerTask('start', ['shell:start_server']);
    grunt.registerTask('e2e-test', ['express:test', 'shell:e2e_test']);
};
