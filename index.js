'use strict';

var gulp = require('gulp-help')(require('gulp'));
var fs = require('fs');
var args = require('yargs').argv;

var basedir = process.env.PWD;
var gulpdir = basedir + '/gulp';

var config = {
  basedir: basedir,
  outdir: basedir + '/lib',
  gulpdir: gulpdir,
  taskdir: gulpdir + '/tasks',
  commonGulpdir: __dirname,
  commonTaskdir: __dirname + '/tasks',
  args: args,
  CI: !!process.env.TRAVIS,
  src: {
    in: 'src/**/*.js',
    root: basedir + '/src'
  },
  test: {
    in: 'spec/**/*.js'
  },
  webpack: {
    loaderModuleDirectories: ['node_modules', 'node_modules/gulp-capacitorjs-common/node_modules']
  }
};

exports.config = config;

var tasks = fs.readdirSync(config.commonTaskdir);
exports.taskFactories = tasks.reduce(function (tasks, taskfile) {
  var jsIndex = taskfile.indexOf('.js');
  var taskName = taskfile.substring(0, taskfile.indexOf('.js'));
  if (~jsIndex) {
    tasks[taskName] = require(config.commonTaskdir + '/' + taskfile);
  }
  return tasks;
}, {});

exports.registerCustom = function () {
  var tasks = fs.readdirSync(config.taskdir);
  tasks.forEach(function (taskfile) {
    var jsIndex = taskfile.indexOf('.js');
    if (~jsIndex) {
      require(config.taskdir + '/' + taskfile)(gulp, config);
    }
  });
};

exports.registerCommon = function () {
  Object.keys(exports.taskFactories).forEach(function (taskName) {
    exports.taskFactories[taskName](gulp, taskName, config);
  });
};
