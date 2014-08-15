/**
 * Grunt configuration for watch task
 */
function getConfiguration(grunt) {
    'use strict';

    return {
        options: {
            livereload: true
        },
        index: {
            files: [
                'source/modules/index.json',
                'source/modules/views/_app-index/**'
            ],
            tasks: [
                'compile-index:development'
            ]
        },
        html: {
            files: [
                'source/modules/**/*.html'
            ],
            tasks: [
                'copy:development',
                'compile-html:development',
                'compile-previews:development'
            ]
        },
        css: {
            files: ['source/**/*.scss'],
            tasks: ['sass:development']
        },
        js: {
            files: [
                'source/assets/scripts.json',
                'source/assets/scripts/**/*.js',
                'source/assets/vendor/**/*.js',
                'source/modules/**/*.js'
            ],
            tasks: [
                'copy:development',
                'compile-html:development',
                'compile-previews:development',
                'concat:development'
            ]
        }
    };
}

module.exports = getConfiguration;
