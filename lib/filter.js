'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');
var lesxDslToJsx = require('lesx-dsl-to-jsx');

var parsed = {};

module.exports = function (content) {
	this.cacheable();

	var query = loaderUtils.parseQuery(this.query);

	var type = query.type,
	    libName = query.libName,
	    libDirectory = query.libDirectory;


	var res = parsed[content];

	if (!res) {
		res = lesxDslToJsx(content, {
			libName: libName,
			libDirectory: libDirectory
		}); // 解析为js/style

		parsed[content] = res;
	}

	this.callback(null, res[type]);
};