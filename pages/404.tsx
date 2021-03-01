import { FC } from 'react';
import 'twin.macro';

const Custom404: FC = () => {
	return (
		<div tw='bg-bgray w-screen h-screen flex flex-col items-center justify-center'>
			<h1 tw='text-white font-bold text-6xl mb-2'>Pare Down for Spotify</h1>
			<h2 tw='text-white font-bold text-3xl'>404 - Page Not Found 😞</h2>
		</div>
	);
};
export default Custom404;
