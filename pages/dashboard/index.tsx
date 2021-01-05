import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { HeaderConstant } from '@/components';

export const DashboardPage: FC = () => {
	const router = useRouter();
	const _playlistUuid = router.query.playlist;

	const dateObject = new Date();
	const currentTime = dateObject.getHours();

	/*useEffect(() => {
		if(_playlistUuid && !authToken) {
			console.log('Auth token was not found redirecting back to the dashboard');
		}
	});*/

	return (
		<div tw='text-white bg-bgray-light w-full min-h-screen'>
			{_playlistUuid ? (
				<PlaylistPage />
			) : (
				<>
					<HeaderConstant href='/' text='Go Back'>
						<h3 tw='text-xl font-bold leading-8  text-brand-blue '>
							{currentTime >= 5 && currentTime < 12 && 'Good Morning '}
							{currentTime >= 12 && currentTime < 17 && 'Good Afternoon '}
							{currentTime >= 17 || currentTime < 5 ? 'Good Evening ' : null}
							<em tw='underline not-italic'>UserName</em> 👋
						</h3>
						<h1 tw='text-3xl font-bold'>
							To start the Pare Down process, you must select one of your playlists below:
						</h1>
					</HeaderConstant>
					<div tw='lg:px-96 lg:mx-2'>a</div>
				</>
			)}
		</div>
	);
};
export default DashboardPage;

export const PlaylistPage: FC = () => {
	return (
		<div tw='bg-bgray text-white w-full min-h-screen relative'>
			<div>playlist options here</div>
			<div tw='px-1'>playlist table here</div>
		</div>
	);
};
