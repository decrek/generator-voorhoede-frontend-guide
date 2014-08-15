var compiler    = require('../utilities/html-compiler');
var marked      = require('marked');						// https://github.com/chjj/marked

module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'compile-previews',
		'Compile preview page for each component in distribution.',
		/**
		 *
		 */
		function (mode) {

            mode = mode || 'distribution';

			var file = grunt.file;
            var pkg = grunt.config('pkg');
            var project = {
                title: pkg.title,
                version: pkg.version
            };

			var previewer = compiler.getTemplate(
				'views/_component-previewer/component-previewer.html');

			function compilePreview (name) {

				var componentDir = compiler.getComponentsDir() + name + '/';
				var webRoot = '../../../';

				var htmlFilename = componentDir + '_' + name + '.html';
				var html = file.exists(htmlFilename) ? file.read(htmlFilename) : '';

				var cssFilename = componentDir + '_' + name + '.css';
				var css = file.exists(cssFilename) ? file.read(cssFilename) : '';

				var jsFilename = componentDir + '_' + name + '.js';
				var js = file.exists(jsFilename) ? file.read(jsFilename) : '';

                var testFilename = componentDir + '_' + name + '.test.js';
                var hasTest = file.exists(testFilename);

				var readmeFilename = componentDir + 'README.md';
				var readme = file.exists(readmeFilename) ? file.read(readmeFilename) : '';
				readme = marked(readme)
					.replace(/<code>/g, '<code class="language-unknown">'); // triggers primsjs css

				var previewerHtml = previewer.render({
					'name': name,
                    'project': project,
					'webRoot': webRoot,
					'pathToAssets': webRoot + compiler.pathToAssets,
					'pathToGuide': webRoot + '/guide/',
                    'chapters': compiler.getChapters(),
                    'components': compiler.getComponents(),
                    'views': compiler.getViews(),
					'code': {
						'html': html,
						'css': css,
						'js': js,
						'readme': readme
					},
                    'mode': mode,
                    'hasTest': hasTest
				});
				file.write(componentDir + 'preview.html', previewerHtml);
			}

			compiler.getComponents().forEach(compilePreview);
		}
	);
};
