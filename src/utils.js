const loaderUtils = require('loader-utils');
const filterPath = require.resolve('./filter');

function getRequire({
	type,
	filePath,
	loaderContext,
	query,
}) {
	return `require(${getRequireString(type, filePath, loaderContext, query)})`;
}

function getRequireString(type, filePath, loaderContext, query) {
	const {
		uiLib = {
			libName: 'antd',
			libDirectory: 'lib'
		},
	} = query;

	const loaderQuery = `libName=${uiLib.libName}&libDirectory=${uiLib.libDirectory}`;

	return loaderUtils.stringifyRequest(
		loaderContext,
		`!!${getLoaderString(type, query)}!${filterPath}?${loaderQuery}&type=${type === 'js' ? type : 'style'}!${filePath}`
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
