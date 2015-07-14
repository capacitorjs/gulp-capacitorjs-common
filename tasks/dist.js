'use strict';

module.exports = function (gulp, name) {
  gulp.task(name, 'Ensure that the library is ready for distribution and build it', ['lint', 'test', 'build']);
};
