module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'develop',
        'Setup web dir for development and watch source',
        function (mode) {

            var tasks = [<% if (svgMinification) { %>
                'svgmin',<% } %><% if (grunticon) { %>
                'grunticon',<% } %>
                'copy:development',
                'compile-html:development',
                'compile-previews:development',
                'compile-index:development',<% if (cssPreprocessor === 'sass' || cssPreprocessor === 'sass-compass') { %>
                'sass:development',<% } %>
                'concat:development',
                'server'
            ];

            if(mode !== 'no-watch'){
                tasks.push('watch');
            }

            grunt.task.run(tasks);
        }
    );
};