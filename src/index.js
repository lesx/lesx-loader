'use strict';

const path = require('path');
const loaderUtils = require('loader-utils');

const {
	getRequire,
} = require('./utils');

module.exports = function(content) {
	const filePath = this.resourcePath; // 当前被load文件的路径
	const loaderContext = this.context; // 当前上下文
	const query = typeof(this.query) === 'string' ? loaderUtils.parseQuery(this.query) : this.query; // loader相关配置

	const filename = path.basename(filePath); // 文件名

	let output = `
    	var _lesx_component = ${getRequire({
    		type: 'js',
    		filePath,
			loaderContext,
			query,
    	})};

    	module.exports = _lesx_component;
    `;

	output += getRequire({
		type: 'sass',
		filePath,
		loaderContext,
		query,
	});

	this.callback(null, output, null);
};
