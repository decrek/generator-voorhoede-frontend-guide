var modulesIndex = require('../utilities/modules-index');
var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'remove-view',
        'Remove a view module by name.',
        /**
         * Remove view's directory and remove from indices.
         *
         * @param {String} viewName
         */
        function (viewName) {

	        // get view name from config if undefined
	        var viewNameConfigKey = grunt.task.current.name + '.viewName';
	        var isConfirmedConfigKey = grunt.task.current.name + '.isConfirmed';
	        viewName = viewName || grunt.config(viewNameConfigKey);

	        // if view name is still undefined, open prompt for it
	        if(!viewName) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: viewNameConfigKey,
				        type: 'list',
				        message: 'Select view to remove',
				        choices: modulesIndex.listViews()
			        })
			        .addQuestion({
				        config: isConfirmedConfigKey,
				        type: 'confirm',
				        message: 'Confirm remove'
			        })
			        .open();
		        return true;
	        }

			if(!modulesIndex.moduleExists('view',viewName)){
	            grunt.log.error('View with name `' + viewName + '` does not exist.');
				return false;
			}

	        function removeView () {
		        var viewsDir = 'source/modules/views/';
		        // run custom clean for view
		        grunt.config('clean.view', [viewsDir + viewName]);
		        grunt.task.run('clean:view');
		        grunt.log.success(
			        'Removed `' + viewName + '` view from `' + viewsDir + '`.'
		        );
		        modulesIndex.removeModule('view', viewName);
	        }

	        var isConfirmed = grunt.config(isConfirmedConfigKey);
	        if (isConfirmed) {
		        removeView();
	        }

	        return true;
        }
    );
};
