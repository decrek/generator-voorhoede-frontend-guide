/**
 * Grunt configuration for compress task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        distribution: {
            options: {
                archive: 'distribution/app.zip'
            },
            files: [
                {
                    src: ['distribution/**', '!distribution/app.zip'],
                    dest: ''
                }
            ]
        }
    };
}

module.exports = getConfiguration;