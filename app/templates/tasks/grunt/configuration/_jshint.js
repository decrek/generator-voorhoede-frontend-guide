/**
 * Grunt configuration for jshint task
 * JS Hint only validates js files in source dir, excluding vendor scripts.
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        options: {
            jshintrc: '.jshintrc'
        },
        // Development task: prints stdout.
        dev: {
            files: {
                src: [
                    'source/**/*.js',
                    '!source/vendor/**/*.js'
                ]
            }
        },
        // CI server: generates a report.
        ci: {
            options: {
                reporter: 'jslint',
                reporterOutput: 'test/report/jshint.xml'
            },
            files: {
                // create absolute file paths manually,
                // otherwise code view doesn't work in Jenkins
                src: [
                    __dirname + '/source/**/*.js',
                    '!' + __dirname + '/source/vendor/**/*.js'
                ]
            }
        }
    };
}

module.exports = getConfiguration;