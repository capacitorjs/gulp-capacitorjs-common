'use strict';

var karma = require('karma').server;
var karmaConf = require('./support/karma.conf');

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Run tests in Chrome', function (done) {
    karma.start(karmaConf(config), done);
  }, {
    options: {
      dev: 'Leave browser open for debugging, watching for file changes'
    }
  });
};
