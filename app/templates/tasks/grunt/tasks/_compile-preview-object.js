var compiler    = require('../utilities/html-compiler');
var marked      = require('marked');						// https://github.com/chjj/marked

module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'compile-preview-objects',
		'Compile html placed in an object on the component page in distribution.',
		/**
		 *
		 */
		function () {

			var file = grunt.file;
            var pkg = grunt.config('pkg');
            var project = {
                title: pkg.title,
                version: pkg.version
            };

			var objectTemplate = compiler.getTemplate(
				'views/_component-previewer/component-previewer-object.html');

			function compileObject (name) {

				var componentDir = compiler.getComponentsDir() + name + '/';
				var webRoot = '../../..';

				var htmlFilename = componentDir + '_' + name + '.html';
				var html = file.exists(htmlFilename) ? file.read(htmlFilename) : '';

				var objectHtml = objectTemplate.render({
					'name': name,
                    'project': project,
					'webRoot': webRoot,
					'pathToAssets': webRoot + compiler.pathToAssets,
					'pathToGuide': webRoot + '/guide/',
					'code': {
						'html': html
					}
				});
				file.write(componentDir + 'object.html', objectHtml);
			}

			compiler.getComponents().forEach(compileObject);
		}
	);
};
