
window.$ = window.jQuery = require('jquery');

var component = require('./components/component');
component('something');
component('something else');

var carousel = require('./components/carousel');
carousel('.carousel');