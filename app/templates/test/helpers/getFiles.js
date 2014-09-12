var grunt = require('grunt');

/**
 * Returns list of scripts based on index `source/assets/scripts.json`.
 * It will add each script file in the index and will look for and
 * include the corresponding test with the extension `.test.js`.
 * @returns {Array}
 */

function getFiles() {
    'use strict';
    var projectDir = __dirname + '/../../';
    var scripts = require(projectDir + 'source/assets/scripts.json');

    var files = scripts.vendor.map(function(name){
        return 'source/vendor/'+ name +'.js';
    });

    function addFile(basename) {
        files.push(basename + '.js');
        var testFilename = basename + '.test.js';
        if(grunt.file.exists(projectDir + testFilename)) {
            files.push(testFilename);
        } else {
            grunt.log.writeln('WARN [config]: '.yellow + 'Test not found `'+ testFilename + '`');
        }
    }
    // add the config file
    addFile('source/assets/scripts/config');

    scripts.common.forEach(function(name){
        addFile('source/assets/scripts/' + name);
    });
    scripts.components.forEach(function(name){
        addFile('source/modules/components/'+ name + '/_' + name);
    });
    scripts.views.forEach(function(name){
        addFile('source/modules/views/'+ name + '/' + name);
    });

    return files;
}

module.exports = getFiles;