module.exports = function (grunt) {
    'use strict';

    // Load external configuration files by task name.
    var configuration = require('./tasks/grunt/configuration')(grunt, [
        'clean',
        'compress',
        'concat',
        'connect',
        'copy',
        'csslint',
        'cssmin',
        'grunticon',
        'jsbeautifier',
        'jshint',
        'prompt',<% if (cssPreprocessor === 'sass' || cssPreprocessor === 'sass-compass') { %>
        'sass',<% } %>
        'svgmin',
        'uglify',
        'watch'
    ]);
    configuration.modulesIndex = 'source/modules/index.json';
    configuration.modulesScss  = 'source/assets/scss/_modules.scss';
    grunt.config.init(configuration); // merge is only added in 0.4.5

    // Load all npm installed grunt tasks.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // load all project grunt tasks.
    grunt.task.loadTasks('tasks/grunt/tasks');
    grunt.registerTask('default', ['task-wizard']);
};
