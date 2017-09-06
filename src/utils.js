const loaderUtils = require('loader-utils');
const filterPath = require.resolve('./filter');


function getRequire({
	type,
	filePath,
	loaderContext,
}) {
	return `require(${getRequireString(type, filePath, loaderContext)})`;
}

function getRequireString(type, filePath, loaderContext) {
	return loaderUtils.stringifyRequest(
		loaderContext,
		`!!${getLoaderString(type)}!${filterPath}?type=${type}!${filePath}`
	);
}

function getLoaderString(type, query) {
	if (!query || !query.loaders || !query.loaders[type]) {
		throw new Error(`[seek-component-loader] Cannot find the loader to handle the code type: ${type}`);
	}

	return query.loaders[type];
}

module.exports = {
	getRequire,
};
