/**
 * Grunt configuration for connect task
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        // Preview server for the `deploy` task.
        distribution: {
            options: {
                port: 9876,
                base: 'distribution',
                keepalive: true
            }
        }
    };
}

module.exports = getConfiguration;