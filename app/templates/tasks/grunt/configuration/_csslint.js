/**
 * Csslint validates generated css files.
 * Validation rules are defined in external file, see
 * [rules in csslint wiki](https://github.com/stubbornella/csslint/wiki/Rules)
 * Note: Only css files in the generated 'style' directory are validated.
 */
function getConfiguration(grunt) {
    'use strict';
    return {
        strict: {
            options: {
                csslintrc: '.csslintrc',
                formatters: [
                    {
                        id: 'lint-xml',
                        dest: 'test/report/csslint.xml'
                    }
                ],
                absoluteFilePathsForFormatters: true
            },
            src: ['source/assets/style/*.css']
        }
    };
}

module.exports = getConfiguration;