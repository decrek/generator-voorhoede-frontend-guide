/**
 * Grunt configuration for clean task
 */
function getConfiguration(grunt) {
	'use strict';
	return {
		distribution: [
			'distribution'
		],
		'distribution-cleanup': [
			'distribution/assets/scripts.json',
			'distribution/assets/scss',
			'distribution/assets/style/guide.css',
			'distribution/guide/**/*.scss',
			'distribution/modules/**/*.scss',
			'distribution/modules/components/_*',
			//'distribution/modules/views/_*',
			'distribution/modules/index.json',
			'distribution/vendor/app-guide-font',
			'distribution/vendor/nunjucks',
			'distribution/vendor/prismjs',
			'distribution/bootstrap.js',
			'distribution/router.js'
			//'distribution/stubs'
		]
	};
}

module.exports = getConfiguration;