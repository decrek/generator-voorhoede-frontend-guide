/**
 * Grunt configuration for cssmin task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
		distribution: {
		    options: {
			    banner: '/* <%= site_name %> */'
		    },
		    files: {
			    'distribution/assets/style/main.css': ['distribution/assets/style/*.css']
		    }
	    }
    };
}

module.exports = getConfiguration;