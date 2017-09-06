'use strict';

var path = require('path');
var loaderUtils = require('loader-utils');

var _require = require('./utils'),
    getRequire = _require.getRequire;

module.exports = function (content) {
	var filePath = this.resourcePath; // 当前被load文件的路径
	var loaderContext = this.context; // 当前上下文
	var query = typeof this.query === 'string' ? loaderUtils.parseQuery(this.query) : this.query; // loader相关配置

	var filename = path.basename(filePath); // 文件名

	var output = '\n    \tvar _lesx_component = ' + getRequire({
		type: 'js',
		filePath: filePath,
		loaderContext: loaderContext
	}) + ';\n\n    \tmodule.exports = _lesx_component;\n    ';

	if (result.style) {
		output += getRequire({
			type: 'sass',
			filePath: filePath,
			loaderContext: loaderContext
		});
	}

	this.callback(null, output, null);
};