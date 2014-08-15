/**
 * Grunt configuration for bump task
 * https://github.com/vojtajina/grunt-bump#configuration
 */
function getConfiguration(grunt) {
    'use strict';
    return {
	    options: {
		    pushTo: 'origin'
	    }
    };
}

module.exports = getConfiguration;