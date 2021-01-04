module.exports = {
	purge: {
		content: ['./pages/**/*.tsx'],
	},
	darkMode: 'class', // or 'media' or 'class' or false
	theme: {
		extend: {
			colors: {
				'brand-white': '#FFE7E2',
				'brand-gray': '#2c2e3e',
				'brand-gray-600': '#242633',
				'brand-blue': '#4392f1',
				'brand-blue-600': '#388bf0',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
