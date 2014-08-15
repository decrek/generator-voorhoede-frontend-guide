var grunt = require('grunt');
var file = grunt.file;

function getIndexFilename() {
    'use strict';
    return grunt.config.get('modulesIndex');
}

function listModules() {
    'use strict';
    var modulesIndexFile = getIndexFilename();
    return grunt.file.readJSON(modulesIndexFile);
}

function listComponents() {
    'use strict';
    return listModules().components;
}

function listViews() {
    'use strict';
    return listModules().views;
}

function moduleExists(type, name) {
	'use strict';
	var modulesIndex = listModules();
	var collection = modulesIndex[type+'s'];
	return collection.indexOf(name) >= 0;
}

function saveIndex(modulesIndex) {
	'use strict';
	var modulesIndexFile = getIndexFilename();

	file.write(modulesIndexFile, JSON.stringify(modulesIndex, null, '\t'));

	var componentsScss = modulesIndex.components
		.filter(function(index){
			return file.exists('source/modules/components/' + index + '/_' + index + '.scss');
		})
		.map(function(index){
			return '@import \'../../modules/components/' + index + '/' + index + '\';';
		})
		.join('\n');

	var viewsScss = modulesIndex.views
		.filter(function(index){
			return file.exists('source/modules/views/' + index + '/_' + index + '.scss');
		})
		.map(function(index){
			return '@import \'../../modules/views/' + index + '/' + index + '\';';
		})
		.join('\n');

	var modulesScss = file.read('tasks/grunt/templates/_modules.scss.template')
		.replace(/\$_COMPONENTS_\$/g, componentsScss)
		.replace(/\$_VIEWS_\$/g, viewsScss);

	var modulesScssFile = grunt.config.get('modulesScss');

	file.write(modulesScssFile, modulesScss);

}

function addModule(type, name) {
	'use strict';
    var modulesIndex = listModules();
    var collection = modulesIndex[type+'s'];

	if(moduleExists(type, name)){
		console.log.warn('A '+ type +' with name `'+ name + '` already exists. Module not added.');
		return modulesIndex;
	}

    collection.push(name);
    collection.sort(function(nameA, nameB){
        if(nameA < nameB) { return -1; }
        if(nameA > nameB) { return 1; }
        return 0;
    });

	saveIndex(modulesIndex);
	grunt.log.success('Added `' + name + '` ' + type + ' to modules index (json & scss).');
    return modulesIndex;
}

function removeModule(type, name) {
	'use strict';
	var modulesIndex = listModules();
	var collection = modulesIndex[type+'s'];

	if(!moduleExists(type, name)){
		console.log.warn('No '+ type +' with name `'+ name + '`. Nothing removed.');
		return modulesIndex;
	}

	var itemIndex = collection.indexOf(name);
	collection.splice(itemIndex, 1);
	saveIndex(modulesIndex);

	grunt.log.success('Removed `' + name + '` ' + type + ' from modules index (json & scss).');
}

module.exports = {
    addModule: addModule,
	removeModule: removeModule,
    listModules: listModules,
    listComponents: listComponents,
    listViews: listViews,
	moduleExists: moduleExists
};