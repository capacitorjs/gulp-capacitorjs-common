'use strict';

var webpack = require('webpack-stream');
var webpackConf = require('./support/webpack.conf');

module.exports = function (gulp, name, config) {
  gulp.task(name, 'Bundle the library for distribution', function () {
    var webpackSettings = webpackConf(config);
    webpackSettings.entry = config.src.main;
    webpackSettings.externals = config.src.externals;
    return webpack(webpackSettings)
      .pipe(gulp.dest(config.outdir));
  });
};
