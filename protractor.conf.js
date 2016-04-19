/**
 * Created by Norman on 03/12/2015.
 */
exports.config = {
    saucelabs: {
        options: {
            args: {
                sauceUser: process.env.SAUCE_USERNAME,
                sauceKey: process.env.SAUCE_ACCESS_KEY
            }
        }
    },
    allScriptsTimeout: 11000,

    specs: [
        'test/**/*.e2e.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'https://localhost:5000',

    framework: 'jasmine',

    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
}