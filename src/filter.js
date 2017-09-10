'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');



module.exports = function(content) {
	this.cacheable();

	const query = loaderUtils.parseQuery(this.query);

	const {
		curSubContent,
	} = query;



	this.callback(null, curSubContent, null);
};
