var modulesIndex = require('../utilities/modules-index');
var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'create-view',
        'Create new view module.',
        /**
         * Create new view module directory with HTML + SCSS + README
         * based on view template.
         *
         * @param {String} viewName
         */
        function (viewName) {

	        var file = grunt.file;

	        // get view name from config if undefined
	        var viewNameConfigKey = grunt.task.current.name + '.viewName';
	        viewName = viewName || grunt.config(viewNameConfigKey);

	        // if view name is still undefined, open prompt for it
	        if(!viewName) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: viewNameConfigKey,
				        type: 'input',
				        message: 'Enter name for new view'
			        })
			        .open();
		        return true;
	        }

            var sourceDir = 'tasks/grunt/templates/view';
            var destinationDir = 'source/modules/views/' + viewName;

            /**
             * @param {String} filename
             * @param {String} [alias]
             * @returns {string}
             */
            function getTemplate (filename, alias) {
                var name = alias || viewName;
                return file.read(sourceDir + '/' + filename)
                    .replace(/\$_VIEW_NAME_\$/g, name)
                    .replace(/\$_CSS_CLASS_\$/g, viewName);
            }

            function capitalize (word) {
                return word.charAt(0).toUpperCase() + word.slice(1);
            }

            file.mkdir(destinationDir);

            file.write(destinationDir + '/' + viewName + '.html',
                getTemplate('view.html', capitalize(viewName)));

            file.write(destinationDir + '/_' + viewName + '.scss',
                getTemplate('_view.scss', viewName.toUpperCase() ));

            file.write(destinationDir + '/README.md',
                getTemplate('README.md', capitalize(viewName)));

            grunt.log.success('Created new view `' + viewName + '` in `' + destinationDir + '`.');

            modulesIndex.addModule('view', viewName);
	        return true;
        }
    );
};
