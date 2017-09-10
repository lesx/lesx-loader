
const lesxDslToJsx = require('lesx-dsl-to-jsx');
const parsed = {};

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

module.exports = getParsedRes;
