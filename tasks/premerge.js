'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

module.exports = function (gulp, name) {
  gulp.task(name, 'Lint and test, outputting a legible format', function (done) {
    runSequence('lint', 'test', done);
  });
};
