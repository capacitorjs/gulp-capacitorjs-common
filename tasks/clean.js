'use strict';

var del = require('del');

module.exports = function (gulp, name, options) {
  gulp.task(name, 'Remove generated files', function (done) {
    del([options.outdir], done);
  });
};
