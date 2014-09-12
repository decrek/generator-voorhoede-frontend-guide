module.exports = function (grunt) {
	'use strict';
	grunt.registerTask(
		'deploy',
		'Concatenates and minifies source files.',
		function () {
			grunt.task.run([
				'clean:distribution',
				'copy:distribution',<% if (cssPreprocessor === 'sass' || cssPreprocessor === 'sass-compass') { %>
				'sass:distribution',<% } %>
				'concat:distribution',
				'compile-html',
				'jsbeautifier:distribution-components',
				'compile-previews',
                'compile-preview-objects',
				'compile-index',
				'jsbeautifier:distribution-html',
				'copy:guide',
				// uglify base.css, main.css?
				'clean:distribution-cleanup',
				'compress:distribution'<% if (testing) { %>,
				'karma:singlerun'<% } %>
			]);
		}
	);
};
