'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const lesxDslToJsx = require('lesx-dsl-to-jsx');

const parsed = {};

module.exports = function(content) {
	this.cacheable();

	const query = loaderUtils.parseQuery(this.query);

	const {
		type,
		libName,
		libDirectory,
	} = query;

	var res = parsed[content];

	if(!res) {
		res = lesxDslToJsx(content, {
			libName,
			libDirectory,
		}); // 解析为js/style

    	parsed[content] = res;
	}

	this.callback(null, res[type]);
};
