import baseConfig from '../../eslint.config.mjs';

const ignoresConfig = {
	ignores: ['build'],
};

export default {
	...baseConfig,
	...ignoresConfig,
};
