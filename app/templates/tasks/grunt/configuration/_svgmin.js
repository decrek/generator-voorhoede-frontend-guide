/**
 * Grunt configuration for cssmin task
 * https://github.com/sindresorhus/grunt-svgmin#documentation
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        distribution: {
            options: {
            },
            files: [
                {
                    expand: true,
                    cwd: 'source/assets/images',
                    src: ['**/*.svg'],
                    dest: 'source/assets/images'
                }
            ]
        }
    };
}

module.exports = getConfiguration;