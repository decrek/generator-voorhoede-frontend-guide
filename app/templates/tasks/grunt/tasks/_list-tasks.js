var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
	'use strict';

	grunt.registerTask(
		'list-tasks',
		'List all available tasks.',
		/**
		 * List all tasks, Symfony style
		 */
		function () {
			// Build object of tasks by info (where they were loaded from).
			var allTasks = [];
			var npmTasks = [];
			var projectTasks = [];
			var writeln = grunt.log.writeln;
			Object.keys(grunt.task._tasks)
				.sort()
				.forEach(function (name) {
					var task = grunt.task._tasks[name];
					if (task.meta.filepath.indexOf('tasks/grunt/tasks/') >= 0) {
						projectTasks.push(task);
					} else {
						npmTasks.push(task);
					}
					allTasks.push(task);
				});

			var logTasks = function (tasks) {
				for (var i = 0, il = tasks.length; i < il; i++) {
					var task = tasks[i];
					var name = task.name;
					if (task.multi) {
						name += '*';
					}
					writeln(name.magenta, ':', task.info);
				}
			};

			if (allTasks.length === 0) {
				writeln('(no tasks found)');
			} else {
				writeln('List of all available tasks (task: description).');
				writeln('Tasks marked with * are "multi-tasks".');

				if (npmTasks.length > 0) {
					grunt.log.header('NPM tasks');
					logTasks(npmTasks);
				}

				if (projectTasks.length > 0) {
					grunt.log.header('Project tasks');
					logTasks(projectTasks);
				}
			}
		}
	);
};