import baseConfig from '../eslint.config.mjs';

const ignoreConfig = {
	ignores: ['build'],
};

export default {
	...baseConfig,
	...ignoreConfig,
};
