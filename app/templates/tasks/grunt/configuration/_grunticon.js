/**
 * Grunt configuration for grunticon task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        grunticon: {
            files: [
                {
                    expand: true,
                    cwd: 'source/assets/images/grunticon-svgs',
                    src: ['*.svg', '*.png'],
                    dest: 'source/assets/images/grunticon-output'
                }
            ],
            options: {
                customselectors: {
                },
                prefix: {
                    prefix: '.icon-'
                },
	            colors: {
	            },
                defaultWidth: '30px',
                defaultHeight: '30px'
            }
        }
    };
}

module.exports = getConfiguration;
