module.exports = {
	distDir: 'build',
	publicRuntimeConfig: {
		// add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
	},
	webpack: (config, { isServer }) => {
		// Fixes npm packages that depend on `fs` module
		if (!isServer) {
			config.node = { fs: 'empty' };
		}

		return config;
	},
};
