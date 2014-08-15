/**
 * Karma task is a simple wrapper to execute the karma shell command with all required arguments
 */

var shell = require('shelljs');

module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'karma',
		'Run karma tests.',
		function (mode) {

            mode = mode || 'development';

            if (mode === 'singlerun') {
                shell.exec('karma start test/karma.conf.js --single-run --no-auto-watch');
            } else {
                shell.exec('karma start test/karma.conf.js --auto-watch --no-single-run');
            }
		}
	);
};
