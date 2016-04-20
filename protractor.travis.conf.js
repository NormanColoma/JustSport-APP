/**
 * Created by Norman on 20/04/2016.
 */
/**
 * Created by Norman on 03/12/2015.
 */
exports.config = {
    sauceUser:'NormanColoma',
    sauceKey: '923e35c3-a5a6-4518-b002-21b52dd559f1',
    specs: [
        'test/**/*.e2e.js'
    ],
    capabilities: {
        'browserName': 'chrome'
    },
    baseUrl: 'http://localhost:5000',
    jasmineNodeOpts: {
        defaultTimeoutInterval: 30000
    }
}