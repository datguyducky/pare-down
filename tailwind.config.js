//eslint-disable-next-line
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	darkMode: 'class', // or 'media' or 'class' or false
	theme: {
		extend: {
			colors: {
				bgray: {
					lightest: '#575b7a',
					light: '#42455c',
					DEFAULT: '#2c2e3e',
					dark: '#222330',
					darkest: '#171821',
				},
				bblue: {
					light: '#71acf4',
					DEFAULT: '#4392f1',
					dark: '#388bf0',
				},
				spotify: {
					green: '#1DB954',
				},
			},
			minHeight: {
				'cover': '190px',
			},
		},
		screens: {
			'xs': '440px',
			...defaultTheme.screens,
			'3xl': '1780px',
		},
	},
	plugins: [],
};
