'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');
var lesxDslToJsx = require('lesx-dsl-to-jsx');

var parsed = {};

module.exports = function (content) {
	this.cacheable();

	var res = parsed[content];

	if (!res) {
		res = lesxDslToJsx(content); // 解析为js/style
		parsed[content] = res;
	}

	var query = loaderUtils.parseQuery(this.query);

	var type = query.type;


	this.callback(null, res[type]);
};