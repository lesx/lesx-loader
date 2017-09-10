'use strict';

var loaderUtils = require('loader-utils');
var filterPath = require.resolve('./filter');

var lesxDslToJsx = require('lesx-dsl-to-jsx');
var parsed = {};

function getRequire(_ref) {
	var type = _ref.type,
	    filePath = _ref.filePath,
	    loaderContext = _ref.loaderContext,
	    query = _ref.query,
	    content = _ref.content;

	return 'require(' + getRequireString(content, type, filePath, loaderContext, query) + ')';
}

function getRequireString(content, type, filePath, loaderContext, query) {
	var _query$uiLib = query.uiLib,
	    uiLib = _query$uiLib === undefined ? {
		libName: 'antd',
		libDirectory: 'lib'
	} : _query$uiLib;


	var curRes = getParsedRes({
		content: content,
		libName: uiLib.libName,
		libDirectory: uiLib.libDirectory
	})[type];

	var loaderQuery = 'libName=' + uiLib.libName + '&libDirectory=' + uiLib.libDirectory;

	return loaderUtils.stringifyRequest(loaderContext, '!!' + getLoaderString(curRes.lang, query) + '!' + filterPath + '?curSubContent=' + curRes.content + '&type=' + type + '!' + filePath);
}

function getLoaderString(type, query) {
	if (!query || !query.loaders || !query.loaders[type]) {
		throw new Error('[lesx-loader] Cannot find the loader to handle the code type: ' + type);
	}

	return query.loaders[type];
}

function getParsedRes(_ref2) {
	var content = _ref2.content,
	    libName = _ref2.libName,
	    libDirectory = _ref2.libDirectory;

	var res = parsed[content];

	if (!res) {
		res = lesxDslToJsx(content, {
			libName: libName,
			libDirectory: libDirectory
		}); // 解析为js/style

		parsed[content] = res;
	}

	return res;
}

module.exports = {
	getRequire: getRequire
};