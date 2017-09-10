const loaderUtils = require('loader-utils');
const filterPath = require.resolve('./filter');

const lesxDslToJsx = require('lesx-dsl-to-jsx');
const parsed = {};


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
	})[style];

	const loaderQuery = `libName=${uiLib.libName}&libDirectory=${uiLib.libDirectory}`;

	return loaderUtils.stringifyRequest(
		loaderContext,
		`!!${getLoaderString(curRes.lang, query)}!${filterPath}?curSubContent=${curRes.content}&type=${type}!${filePath}`
	);
}

function getLoaderString(type, query) {
	if (!query || !query.loaders || !query.loaders[type]) {
		throw new Error(`[lesx-loader] Cannot find the loader to handle the code type: ${type}`);
	}

	return query.loaders[type];
}

function getParsedRes({
	content,
	libName,
	libDirectory,
}) {
	var res = parsed[content];

	if(!res) {
		res = lesxDslToJsx(content, {
			libName,
			libDirectory,
		}); // 解析为js/style

    	parsed[content] = res;
	}

	return res;
}



module.exports = {
	getRequire,
};
