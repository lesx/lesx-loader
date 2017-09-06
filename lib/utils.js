'use strict';

var loaderUtils = require('loader-utils');
var filterPath = require.resolve('./filter');

function getRequire(_ref) {
	var type = _ref.type,
	    filePath = _ref.filePath,
	    loaderContext = _ref.loaderContext,
	    query = _ref.query;

	return 'require(' + getRequireString(type, filePath, loaderContext, query) + ')';
}

function getRequireString(type, filePath, loaderContext, query) {
	var _query$uiLib = query.uiLib,
	    uiLib = _query$uiLib === undefined ? {
		libName: 'antd',
		libDirectory: 'lib'
	} : _query$uiLib;


	var loaderQuery = 'libName=' + uiLib.libName + '&libDirectory=' + uiLib.libDirectory;

	return loaderUtils.stringifyRequest(loaderContext, '!!' + getLoaderString(type, query) + '!' + filterPath + '?' + loaderQuery + '&type=' + (type === 'js' ? type : 'style') + '!' + filePath);
}

function getLoaderString(type, query) {
	if (!query || !query.loaders || !query.loaders[type]) {
		throw new Error('[lesx-loader] Cannot find the loader to handle the code type: ' + type);
	}

	return query.loaders[type];
}

module.exports = {
	getRequire: getRequire
};