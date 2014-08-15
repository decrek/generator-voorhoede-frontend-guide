var prompt = require('../utilities/prompt');

module.exports = function (grunt) {
    'use strict';
    grunt.registerTask(
        'list-modules',
        'List all registered modules (views & components).',
        /**
         * @param {String} [type]   module type, expects `views` or `components`.
         */
        function (type) {
	        var modulesIndexFile = grunt.config.get('modulesIndex');
            var modulesIndex = grunt.file.readJSON(modulesIndexFile);
	        var moduleTypes = ['views','components'];

	        // get component name from config if undefined
	        var moduletypeConfigKey = grunt.task.current.name + '.moduleType';
	        type = type || grunt.config(moduletypeConfigKey);

	        // if component name is still undefined, open prompt for it
	        if(!type) {
		        prompt(grunt.task.current.name)
			        .addQuestion({
				        config: moduletypeConfigKey,
				        type: 'list',
				        message: 'Select module type',
				        choices: ['all','views','components']
			        })
			        .open();
		        return true;
	        }

	        if(moduleTypes.indexOf(type) >= 0) {
		        moduleTypes = [type];
	        }

	        moduleTypes.forEach(function(moduleType) {
		        grunt.log.header(moduleType);
		        modulesIndex[moduleType].forEach(function(name){
					grunt.log.writeln(name.magenta);
		        });
	        });
        }
    );
};
