module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'sass-and-lint',
		'Compile scss files and lint css files.',
		/**
		 * ..
		 */
		function () {
			grunt.task.run(['sass:development','csslint']);
		}
	);
};
