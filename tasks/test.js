'use strict';

var KarmaServer = require('karma').Server;
var karmaConf = require('./support/karma.conf');

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Run tests in Chrome', function (done) {
    var server = new KarmaServer(karmaConf(config), done);
    server.start();
  }, {
    options: {
      dev: 'Leave browser open for debugging, watching for file changes'
    }
  });
};
