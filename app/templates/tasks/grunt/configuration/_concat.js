/**
 * Grunt configuration for concat task
 */
function getConfiguration(grunt) {
	'use strict';
	var scriptIndex = grunt.file.readJSON('source/assets/scripts.json');

	function getFiles(destination){
		var files = {};
		files[destination + '/assets/scripts/vendor.js'] = (function(){
			var sources = [];
			scriptIndex.vendor.forEach(function(name){
				sources.push('source/vendor/'+name+'.js');
			});
			return sources;
		}());
		files[destination + '/assets/scripts/main.js'] = (function(){
			var sources = [];
			scriptIndex.common.forEach(function(name){
				sources.push('source/assets/scripts/'+name+'.js');
			});
			scriptIndex.components.forEach(function(name){
				sources.push('source/modules/components/'+name+'/_'+name+'.js');
			});
			scriptIndex.views.forEach(function(name){
				sources.push('source/modules/views/'+name+'/_'+name+'.js');
			});
			return sources;
		}());
		files[destination + '/assets/scripts/debug.js'] = ['source/assets/scripts/debug.js'];<% if (respondjs) { %>
		files[destination + '/assets/scripts/respond.js'] = ['source/vendor/respondjs/respond.js'];<% } %>
		return files;
	}

	return {
		development: {
			files: getFiles('web')
		},
		distribution: {
			files: getFiles('distribution')
		}
	};
}

module.exports = getConfiguration;