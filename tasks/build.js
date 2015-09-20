'use strict';

var webpack = require('webpack-stream');
var cloneDeep = require('lodash.clonedeep');

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Bundle the library for distribution', function () {
    var webpackSettings = cloneDeep(config.webpack);
    webpackSettings.entry = config.src.main;
    webpackSettings.externals = config.src.externals;
    webpackSettings.watch = !!config.args.dev;
    return webpack(webpackSettings)
      .pipe(gulp.dest(config.outdir));
  });
};
