# gulp-capacitorjs-common

Common gulp tasks for CapacitorJS

`config` the basic config object used by the tasks
`taskFactories` the built-in tasks, taking the form (gulp, taskName, config) -> register task
`registerCommon` register the built-in tasks, with the default name and config
`registerCustom` register the tasks in gulp/tasks, taking the form (gulp, config) -> register task
