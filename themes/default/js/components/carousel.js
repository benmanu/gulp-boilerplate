/*jshint node: true */

'use strict';

var $ = require('jQuery');
var carousel = require('../vendor/carousel');

module.exports = function(element, options) {
	$(element).carousel(options);
};
