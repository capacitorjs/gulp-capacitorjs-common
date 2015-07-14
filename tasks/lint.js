'use strict';

var eslint = require('gulp-eslint');

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Lint source files', function () {
    return gulp.src([config.src.in, config.test.in])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError());
  });
};
