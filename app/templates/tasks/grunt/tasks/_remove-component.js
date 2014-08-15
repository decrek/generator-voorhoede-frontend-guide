var modulesIndex = require('../utilities/modules-index');
var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'remove-component',
        'Remove a component module by name.',
        /**
         * Remove component's directory and remove from indices.
         *
         * @param {String} componentName
         */
        function (componentName) {

	        // get component name from config if undefined
	        var componentNameConfigKey = grunt.task.current.name + '.componentName';
	        var isConfirmedConfigKey = grunt.task.current.name + '.isConfirmed';
	        componentName = componentName || grunt.config(componentNameConfigKey);

	        // if component name is still undefined, open prompt for it
	        if(!componentName) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: componentNameConfigKey,
				        type: 'list',
				        message: 'Select component to remove',
				        choices: modulesIndex.listComponents()
			        })
			        .addQuestion({
				        config: isConfirmedConfigKey,
				        type: 'confirm',
				        message: 'Confirm remove'
			        })
			        .open();
		        return true;
	        }

			if(!modulesIndex.moduleExists('component',componentName)){
	            grunt.log.error('Component with name `' + componentName + '` does not exist.');
				return false;
			}

	        function removeComponent () {
		        var componentsDir = 'source/modules/components/';
		        // run custom clean for component
		        grunt.config('clean.component', [componentsDir + componentName]);
		        grunt.task.run('clean:component');
		        grunt.log.success(
			        'Removed `' + componentName + '` component from `' + componentsDir + '`.'
		        );
		        modulesIndex.removeModule('component', componentName);
	        }

	        var isConfirmed = grunt.config(isConfirmedConfigKey);
	        if (isConfirmed) {
		        removeComponent();
	        }

	        return true;
        }
    );
};
