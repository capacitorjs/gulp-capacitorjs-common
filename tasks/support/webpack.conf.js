'use strict';

module.exports = function (config) {
  return {
    output: {
      filename: config.src.out,
      libraryTarget: 'umd'
    },
    module: {
      preLoaders: [],
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }]
    },
    resolve: {
      alias: {
        src: config.src.root
      }
    },
    resolveLoader: {
      modulesDirectories: ['node_modules', 'node_modules/gulp-capacitorjs-common/node_modules']
    },
    devtool: 'source-map'
  };
};
