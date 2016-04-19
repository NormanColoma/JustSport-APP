/**
 * Created by Norman on 03/12/2015.
 */
exports.config = {
    allScriptsTimeout: 11000,

    specs: [
        'test/**/*.e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome',
        'build': process.env.TRAVIS_BUILD_NUMBER
    },

    baseUrl: 'https://localhost:5000',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
}