var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'create-task-configuration',
        'Create basic grunt task configuration.',
        /**
         * @param {String} taskName
         */
        function (taskName) {

	        var file = grunt.file;

	        // get component name from config if undefined
	        var taskNameConfigKey = grunt.task.current.name + '.newTaskName';
	        taskName = taskName || grunt.config(taskNameConfigKey);

	        // if component name is still undefined, open prompt for it
	        if(!taskName) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: taskNameConfigKey,
				        type: 'input',
				        message: 'Enter task name for new configuration'
			        })
			        .open();
		        return true;
	        }

            if(!taskName) {
                grunt.log.error('create-task-configuration requires a `task name` as argument.');
                grunt.log.error('For example use: `grunt create-task-configuration:sass`.');
                return false;
            }

            var source = 'tasks/grunt/templates/task-configuration.js';
            var destination = 'tasks/grunt/configuration/' + taskName + '.js';

            var template = file.read(source)
                .replace(/\$_TASK_NAME_\$/g, taskName);

            file.write(destination, template);

            grunt.log.success(
                'Created new configuration for `' + taskName + '` in `' + destination + '`.'
            );

            return true;
        }
    );
};
