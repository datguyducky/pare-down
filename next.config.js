module.exports = {
	distDir: 'build',
	publicRuntimeConfig: {
		// add your public runtime environment variables here with NEXT_PUBLIC_*** prefix
	},
	/* THIS IS DANGEROUS BUT WILL BE ENABLED FOR NOW
	 * later all eslint and typescript errors/warning should be fixed
	 * and this options removed!! todo
	 */
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
};
