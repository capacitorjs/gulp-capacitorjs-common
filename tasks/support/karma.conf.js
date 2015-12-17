'use strict';

var cloneDeep = require('lodash.clonedeep');
var isparta = require('isparta');

module.exports = function (config) {

  var karmaConf = {
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai-as-promised', 'sinon', 'sinon-chai', 'chai'],

    // list of files / patterns to load in the browser
    files: [
      config.commonGulpdir + '/node_modules/babel-core/browser-polyfill.js',
      config.test.in
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['mocha', 'growl', 'coverage'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      CHROME_TRAVIS_CI: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    coverageReporter: {
      // configure the reporter to use isparta for JavaScript coverage
      instrumenters: {isparta: isparta},
      instrumenter: {}
    }
  };

  karmaConf.preprocessors[config.test.in] = ['webpack', 'sourcemap'];

  var dev = !!config.args.dev;
  karmaConf.autoWatch = dev;
  karmaConf.singleRun = !dev;

  var webpack = cloneDeep(config.webpack);
  if (!dev) {
    webpack.module.preLoaders.push({
      test: /(\.js)$/,
      exclude: /(spec|node_modules)\//,
      loader: 'isparta-instrumenter-loader'
    });
  } else {
    webpack.devtool = 'inline-source-map';
  }

  if (config.CI) {
    karmaConf.browsers = ['CHROME_TRAVIS_CI'];
  }

  karmaConf.webpack = webpack;
  karmaConf.coverageReporter.instrumenter[config.src.in] = 'isparta';

  return karmaConf;
};

