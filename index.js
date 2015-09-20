'use strict';

var gulp = require('gulp-help')(require('gulp'));
var fs = require('fs');
var args = require('yargs').argv;
var merge = require('lodash.merge');
var webpackConfig = require('./tasks/support/webpack.conf');
var karmaConfig = require('./tasks/support/karma.conf');

var basedir = process.env.PWD;
var gulpdir = basedir + '/gulp';

var commonGulpdir = __dirname;
var commonTaskdir = __dirname + '/tasks';

var config = function (initialConfig) {
  var config = merge({
    basedir: basedir,
    outdir: basedir + '/lib',
    gulpdir: gulpdir,
    taskdir: gulpdir + '/tasks',
    readonly: {
      commonGulpdir: commonGulpdir,
      commonTaskdir: commonTaskdir
    },
    args: args,
    CI: !!process.env.TRAVIS,
    src: {
      in: 'src/**/*.js',
      root: basedir + '/src'
    },
    test: {
      in: 'spec/**/*.js'
    }
  }, initialConfig);

  config.webpack = webpackConfig(config);
  config.karma = karmaConfig(config);
  return config;
};

exports.config = config;

var tasks = fs.readdirSync(commonTaskdir);
exports.taskFactories = tasks.reduce(function (tasks, taskfile) {
  var jsIndex = taskfile.indexOf('.js');
  var taskName = taskfile.substring(0, taskfile.indexOf('.js'));
  if (~jsIndex) {
    tasks[taskName] = require(commonTaskdir + '/' + taskfile);
  }
  return tasks;
}, {});

exports.registerCustom = function (config) {
  var tasks = fs.readdirSync(config.taskdir);
  tasks.forEach(function (taskfile) {
    var jsIndex = taskfile.indexOf('.js');
    if (~jsIndex) {
      require(config.taskdir + '/' + taskfile)(gulp, config);
    }
  });
};

exports.registerCommon = function (config) {
  Object.keys(exports.taskFactories).forEach(function (taskName) {
    exports.taskFactories[taskName](gulp, taskName, config);
  });
};
