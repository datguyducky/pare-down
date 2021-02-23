import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';

const PlaylistIndexView: FC = () => {
	const router = useRouter();

	useEffect(() => {
		router.replace('/dashboard');
		//eslint-disable-next-line
	}, []);
	return <div tw='text-white bg-bgray w-full min-h-screen' />;
};

export default PlaylistIndexView;
