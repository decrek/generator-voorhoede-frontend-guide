/**
 * Grunt configuration for uglify task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        app: {
            files: [
//                {
//                    src: 'distribution/assets/scripts/app.js',
//                    dest: 'distribution/assets/scripts/app.js'
//                }
            ]
        }
    };
}

module.exports = getConfiguration;