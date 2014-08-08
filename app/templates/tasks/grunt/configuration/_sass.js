/**
 * Sass compiles all scss files in assets/scss to assets/style.
 * Generates sourcemaps and therefore requires 3.3.0 or higher.
 * Partials (starting with underscore) are excluded.
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        // https://github.com/gruntjs/grunt-contrib-sass#options
        development: {
            options: {
                sourcemap: true,
                style: 'expanded'
            },
            files: [
                {
                    expand: true,
                    cwd: 'source/assets/scss',
                    src: ['main.scss'],
                    dest: 'web/assets/style',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: 'source/assets/scss',
                    src: ['guide.scss', 'debug.scss'],
                    dest: 'web/guide',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: 'source/modules',
                    src: ['**/*.scss'],
                    dest: 'web/modules',
                    ext: '.css'
                }
            ]
        },
        developmentServer: {
            options: {
                sourcemap: false,
                style: 'expanded'
            },
            files: [
                {
                    expand: true,
                    cwd: 'source/assets/scss',
                    src: ['main.scss'],
                    dest: 'web/assets/style',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: 'source/assets/scss',
                    src: ['guide.scss', 'debug.scss'],
                    dest: 'web/guide',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: 'source/modules',
                    src: ['**/*.scss'],
                    dest: 'web/modules',
                    ext: '.css'
                }
            ]
        },
        distribution: {
            options: {
                sourcemap: false,
                style: 'expanded'
            },
            files: [
                {
                    expand: true,
                    cwd: 'source/assets/scss',
                    src: ['*.scss', '!_*.scss'],
                    dest: 'distribution/assets/style',
                    ext: '.css'
                },
                {
                    expand: true,
                    cwd: 'source/modules',
                    src: ['**/*.scss'],
                    dest: 'distribution/modules',
                    ext: '.css'
                }
            ]
        }
    };
}

module.exports = getConfiguration;