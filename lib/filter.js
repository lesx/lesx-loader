'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');

module.exports = function (content) {
	this.cacheable();

	var query = loaderUtils.parseQuery(this.query);

	var curSubContent = query.curSubContent;


	this.callback(null, curSubContent, null);
};