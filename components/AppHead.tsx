import Head from 'next/head';
import { FC } from 'react';

const AppHead: FC = () => {
	return (
		<Head>
			<title>Pare Down for Spotify</title>
			<meta property='og:title' content='Pare Down for Spotify' key='title' />
			<meta charSet='utf-8' />

			<meta name='viewport' content='initial-scale=1.0, width=device-width' />
			<meta
				name='description'
				content='With Pare Down for Spotify you can easily create copy of your playlist with reduced number of songs.'
			/>

			<link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
			<link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
			<link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
			<link rel='manifest' href='/site.webmanifest' />
			<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#4392f1' />
			<meta name='msapplication-TileColor' content='#4392f1' />
			<meta name='theme-color' content='#ffffff' />
		</Head>
	);
};
export default AppHead;
