'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const lesxDslToJsx = require('lesx-dsl-to-jsx');

const parsed = {};

module.exports = function(content) {
	this.cacheable();

	var res = parsed[content];

	if(!res) {
		res = lesxDslToJsx(content); // 解析为js/style
    	parsed[content] = res;
	}


	const query = loaderUtils.parseQuery(this.query);

	const {
		type,
	} = query;

	this.callback(null, res[type]);
};
