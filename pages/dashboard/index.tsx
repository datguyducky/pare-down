import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { HeaderConstant, PlaylistCard } from '@/components';
import { UseUser, UseUserPlaylists } from '../../data';

const DashboardView: FC = () => {
	const router = useRouter();

	const dateObject = new Date();
	const currentTime = dateObject.getHours();

	const { user: user, isError: userIsError } = UseUser();
	useEffect(() => {
		if (userIsError) {
			router.replace('/api/login');
		}
	});

	const { playlists: playlists, isError: playlistsIsError } = UseUserPlaylists();

	return (
		<div tw='text-white bg-bgray-light w-full min-h-screen'>
			<HeaderConstant href='/' text='Go Back'>
				<h3 tw='text-xl font-bold leading-8  text-bblue '>
					{currentTime >= 5 && currentTime < 12 && 'Good Morning '}
					{currentTime >= 12 && currentTime < 17 && 'Good Afternoon '}
					{currentTime >= 17 || currentTime < 5 ? 'Good Evening ' : null}
					<em tw='underline not-italic h-full inline-block'>
						{user?.display_name || <span tw='bg-bgray-light w-32 mx-1 inline-block h-5 rounded-sm animate-pulse' />}
					</em>{' '}
					👋
				</h3>

				<h1 tw='text-3xl font-bold'>To start the Pare Down process, you must select one of your playlists below:</h1>
			</HeaderConstant>
			<div tw='lg:px-72 lg:mx-2 flex flex-wrap flex-none gap-5 justify-center pb-10'>
				{playlists && playlists.items.map((p) => <PlaylistCard key={p.id} image={p.image} name={p.name} id={p.id} />)}
			</div>
		</div>
	);
};
export default DashboardView;
