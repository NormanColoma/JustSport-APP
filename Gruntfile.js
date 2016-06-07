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
            files: ['Gruntfile.js','./app/**/*.js','./routes/*.js','./test/**/*.js', '!./app/app.min.js', '!./app/app.test.min.js'],
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
                        'app/establishment-details/establishment.module.js','app/establishment-details/establishmentDetails.controller.js','app/services/establishmentDetails.service.js',
                        'app/components/establishmentDetails.directive.js','app/components/establishmentVote.directive.js', 'app/account/userAccount.module.js',
                        'app/account/userAccount.controller.js','app/services/userAccount.service.js', 'app/components/uploadButton.directive.js',
                        'app/backoffice/backoffice.module.js','app/components/backOfficeTabs.directive.js','app/components/backOfficeEstabs.directive.js',
                        'app/components/backOfficeAddEstab.directive.js','app/components/backOfficeImpartSp.directive.js','app/components/deleteEstab.directive.js',
                        'app/components/updateEstab.directive.js','app/components/uploadImgEstab.directive.js','app/services/backOfficeEstabs.service.js',
                        'app/services/backOfficeSport.service.js', 'app/backoffice-estabs/backOfficeEstabs.controller.js',
                        'app/components/addSport.directive.js','app/backoffice-sports/backOfficeSports.controller.js',
                        'app/app.module.js', 'app/services/formReset.service.js','app/services/dialog.service.js', 'app/services/redirectTo.service.js']
                }
            },
            test_app:{
                files:{
                    'app/app.test.min.js':['test/app/app.test.js', 'test/app/citySuggestions.module.test.js', 'test/app/sports.module.test.js',
                        'test/app/estabsFiltered.module.test.js', 'test/app/login.module.test.js', 'test/app/register.module.test.js',
                        'test/app/showSchedule.module.test.js', 'test/app/establishmentDetails.module.test.js','test/app/userAccount.module.test.js',
                        'test/app/backOffice.module.test.js','test/app/backOfficeEsts.module.test.js','test/app/backOfficeAddEst.module.test.js',
                        'test/app/backOfficeImpartSp.module.test.js', 'test/app/backOfficeUpdateEst.module.test.js', 'test/app/backOfficeAddSport.module.test.js'
                    ]
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
            },
            unit_travis:{
                command: 'karma start --browsers Firefox --single-run'
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
    grunt.registerTask('build-travis', ['jshint', 'unit-test', 'e2e-travis']);
    grunt.registerTask('unit-test', ['karma:unit']);
    grunt.registerTask('start', ['shell:start_server']);
    grunt.registerTask('e2e-test', ['express:test', 'shell:e2e_test']);
    grunt.registerTask('e2e-test-prod', ['express:production', 'shell:e2e_test']);
    grunt.registerTask('e2e-travis', ['express:test', 'shell:e2e_travis']);
};
