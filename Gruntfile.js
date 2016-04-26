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
                        'app/services/getSchedule.service.js', 'app/services/citySuggestions.service.js','app/home/home.controller.js',
                        'app/home/showSchedule.controller.js','app/home/establishmentFiltered.controller.js',
                        'app/login/login.module.js','app/services/login.service.js', 'app/login/login.controller.js',
                        'app/register/register.module.js', 'app/register/register.controller.js', 'app/services/register.service.js',
                        'app/app.module.js', 'app/services/dialog.service.js']
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
            },
            e2e_travis:{
                command: 'protractor protractor.travis.conf.js'
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
            },
            dev:{
                options: {
                    script: 'bin/www.js',
                    node_env: 'development'
                }
            },production:{
                options:{
                    script: 'bin/www.js',
                    node_env: 'production'
                }
            }
        },
        watch: {
            files: ['app/**/*.js','test/app/**/*.js'],
            tasks: ['uglify']
        }
    });

    grunt.registerTask('build', ['jshint', 'unit-test', 'e2e-test']);
    grunt.registerTask('build-travis', ['jshint', 'unit-test']);
    grunt.registerTask('unit-test', ['karma:unit']);
    grunt.registerTask('start', ['shell:start_server']);
    grunt.registerTask('e2e-test', ['express:test', 'shell:e2e_test']);
    grunt.registerTask('e2e-test-prod', ['express:production', 'shell:e2e_test']);
    grunt.registerTask('e2e-travis', ['express:test', 'shell:e2e_travis']);
};
