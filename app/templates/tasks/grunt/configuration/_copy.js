/**
 * Grunt configuration for copy task
 */
function getConfiguration(grunt) {
    'use strict';

    return {
        development: {
            files: [{
                src: 'web/modules/views/_style-guide/_style-guide.html',
                dest: 'web/guide/style-guide.html'
            }, {
                src: 'bower_components/voorhoede-core-styles/core.css',
                dest: 'web/guide/voorhoede-core-styles.css'
            }, {
                expand: true,
                cwd: 'bower_components/voorhoede-core-styles/',
                src: ['**'],
                dest: 'web/guide/'
            }, {
                expand: true,
                cwd: 'source/modules/',
                src: ['**'],
                dest: 'web/modules/'
            }]
        },
        distribution: {
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['**'],
                dest: 'distribution/'
            }, {
                expand: true,
                cwd: 'source/',
                src: [
                    'vendor/prismjs/**',
                    'vendor/jasmine-2.0/**'
                ],
                dest: 'distribution/guide/'
            }]
        },
        guide: {
            files: [{
                expand: true,
                cwd: 'source/',
                src: ['vendor/app-guide-font/**'],
                dest: 'distribution/guide/'
            }, {
                expand: true,
                cwd: 'distribution/assets/style/',
                src: ['guide.css', 'debug.css'],
                dest: 'distribution/guide/'
            }, {
                src: 'distribution/modules/views/_style-guide/_style-guide.html',
                dest: 'distribution/guide/style-guide.html'
            }]
        }
    };
}

module.exports = getConfiguration;
