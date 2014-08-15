var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'create-task',
        'Create empty grunt task.',
        /**
         * @param {String} taskName
         */
        function (taskName) {

	        var file = grunt.file;

	        // get task name from config if undefined
	        var taskNameConfigKey = grunt.task.current.name + '.newTaskName';
	        taskName = taskName || grunt.config(taskNameConfigKey);

	        // if task name is still undefined, open prompt for it
	        if(!taskName) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: taskNameConfigKey,
				        type: 'input',
				        message: 'Enter name for new task'
			        })
			        .open();
		        return true;
	        }

	        var source = 'tasks/grunt/templates/task.js';
	        var destination = 'tasks/grunt/tasks/' + taskName + '.js';
            var template = file.read(source)
                .replace(/\$_TASK_NAME_\$/g, taskName);

            file.write(destination, template);

            grunt.log.success('Created new task `' + taskName + '` in `' + destination + '`.');
	        return true;
        }
    );
};
