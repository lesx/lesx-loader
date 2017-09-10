const loaderUtils = require('loader-utils');
const filterPath = require.resolve('./filter');

const getParsedRes = require('./get-parsed-res');


function getRequire({
	type,
	filePath,
	loaderContext,
	query,
	content,
}) {
	return `require(${getRequireString(content, type, filePath, loaderContext, query)})`;
}

function getRequireString(content, type, filePath, loaderContext, query) {
	const {
		uiLib = {
			libName: 'antd',
			libDirectory: 'lib'
		},
	} = query;

	const curRes = getParsedRes({
		content,
		libName: uiLib.libName,
		libDirectory: uiLib.libDirectory,
	})[type];

	const loaderQuery = `libName=${uiLib.libName}&libDirectory=${uiLib.libDirectory}&type=${type}`;

	return loaderUtils.stringifyRequest(
		loaderContext,
		`!!${getLoaderString(curRes.lang, query)}!${filterPath}?${loaderQuery}!${filePath}`
	);
}

function getLoaderString(type, query) {
	if (!query || !query.loaders || !query.loaders[type]) {
		throw new Error(`[lesx-loader] Cannot find the loader to handle the code type: ${type}`);
	}

	return query.loaders[type];
}

module.exports = {
	getRequire,
};
