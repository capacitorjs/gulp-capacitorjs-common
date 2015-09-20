'use strict';

var KarmaServer = require('karma').Server;

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Run tests in Chrome', function (done) {
    var server = new KarmaServer(config.karma, done);
    server.start();
  }, {
    options: {
      dev: 'Leave browser open for debugging, watching for file changes'
    }
  });
};
