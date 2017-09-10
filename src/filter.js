'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');
const getParsedRes = require('./get-parsed-res');


module.exports = function(content) {
	this.cacheable();

	const query = loaderUtils.parseQuery(this.query);

	const {
		libName,
		libDirectory,
		type,
	} = query;


	const curRes = getParsedRes({
		content,
		libName,
		libDirectory,
	});

	this.callback(null, curRes[type].content, null);
};
