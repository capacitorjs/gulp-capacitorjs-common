module.exports = function (config) {
  return {
    output: {
      filename: config.src.out
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
      modulesDirectories: config.webpack.loaderModuleDirectories
    },
    devtool: 'source-map'
  };
};
