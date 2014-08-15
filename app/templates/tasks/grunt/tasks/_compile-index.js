var compiler = require('../utilities/html-compiler');

module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'compile-index',
		'Compile index file for all views & components.',
		/**
		 *
		 */
		function (mode) {

			mode = mode || 'distribution';

			var pkg = grunt.config('pkg');
			var project = {
				title: pkg.title,
				version: pkg.version
			};

			var webRoot = './';
			var template = compiler.getTemplate('views/_app-index/app-index.html');

			var html = template.render({
				'name': 'Front-end Guide',
				'project': project,
				'webRoot': webRoot,
				'pathToAssets': compiler.pathToAssets,
				'pathToGuide': webRoot + 'guide/',
				'components': compiler.getComponents(),
				'views': compiler.getViews(),
				'chapters': compiler.getChapters(),
				'mode': mode
			});

			if(mode === 'development'){
				grunt.file.write('web/index.html', html);
			} else {
				grunt.file.write('distribution/index.html', html);
			}
		}
	);
};
