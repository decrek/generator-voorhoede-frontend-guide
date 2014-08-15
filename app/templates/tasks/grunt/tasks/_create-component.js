var modulesIndex = require('../utilities/modules-index');
var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'create-component',
        'Create new component module.',
        /**
         * Create new component module directory with HTML + SCSS + README
         * based on component template.
         *
         * @param {String} componentName
         */
        function (componentName) {

	        var file = grunt.file;

	        // get component name from config if undefined
	        var componentNameConfigKey = grunt.task.current.name + '.componentName';
	        componentName = componentName || grunt.config(componentNameConfigKey);

	        // if component name is still undefined, open prompt for it
	        if(!componentName) {
		        prompt(grunt.task.current.name)
		            .addQuestion({
				        config: componentNameConfigKey,
				        type: 'input',
				        message: 'Enter name for new component'
			        })
			        .open();
		        return true;
	        }

			if(modulesIndex.moduleExists('component',componentName)){
	            grunt.log.error('A component with name `' + componentName + '` already exists');
				return false;
			}

	        var sourceDir = 'tasks/grunt/templates/component';
	        var destinationDir = 'source/modules/components/' + componentName;

            /**
             * @param {String} filename
             * @param {String} [alias]
             * @returns {string}
             */
            function getTemplate (filename, alias) {
                var name = alias || componentName;
                return file.read(sourceDir + '/' + filename)
                    .replace(/\$_COMPONENT_NAME_\$/g, name)
                    .replace(/\$_CSS_CLASS_\$/g, componentName);
            }

            file.mkdir(destinationDir);

            file.write(destinationDir + '/_' + componentName + '.html',
                getTemplate('_component.html'));

            file.write(destinationDir + '/_' + componentName + '.scss',
                getTemplate('_component.scss.template'));

            file.write(destinationDir + '/README.md', getTemplate('README.md'));

            grunt.log.success(
                'Created new component `' + componentName + '` in `' + destinationDir + '`.'
            );

            modulesIndex.addModule('component', componentName);
	        return true;
        }
    );
};
