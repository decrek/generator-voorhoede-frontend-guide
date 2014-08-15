/**
 * Borrowed from PrototypeJS:
 * https://github.com/sstephenson/prototype/blob/ecacc02/src/prototype/lang/string.js#L558
 * @param {String} word     dash-cased-word
 * @param {String}          camelCasedWord
 */
function camelize(word) {
    'use strict';
    return word.replace(/-+(.)?/g, function(match, chr) {
        return chr ? chr.toUpperCase() : '';
    });
}

module.exports = camelize;