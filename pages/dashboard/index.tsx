import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import 'twin.macro';
import { HeaderConstant, PlaylistCard } from '@/components';
import { UseUser, UseUserPlaylists } from '../../data';
import InfiniteScroll from 'react-infinite-scroll-component';

const DashboardView: FC = () => {
	const router = useRouter();

	const dateObject = new Date();
	const currentTime = dateObject.getHours();

	const { data: user, isError: userIsError } = UseUser();
	useEffect(() => {
		if (userIsError) {
			router.replace('/api/login');
		}
	});

	const { data, size, setSize } = UseUserPlaylists();

	return (
		<div tw='text-white bg-bgray-light w-full min-h-screen'>
			<HeaderConstant href='/' text='Go Back'>
				<h3 tw='text-base sm:text-xl font-bold leading-6 sm:leading-8 text-bblue'>
					{currentTime >= 5 && currentTime < 12 && 'Good Morning '}
					{currentTime >= 12 && currentTime < 17 && 'Good Afternoon '}
					{currentTime >= 17 || currentTime < 5 ? 'Good Evening ' : null}
					<em tw='underline not-italic h-full inline-block'>
						{user?.display_name || <span tw='bg-bgray-light w-32 mx-1 inline-block h-5 rounded-sm animate-pulse' />}
					</em>{' '}
					👋
				</h3>

				<h1 tw='text-xl sm:text-3xl font-bold'>
					To start the Pare Down process, you must select one of your playlists below:
				</h1>
			</HeaderConstant>
			<div tw='px-8 3xl:px-80 lg:mx-2'>
				{data && (
					<InfiniteScroll
						dataLength={data.length}
						hasMore={data[data.length - 1].next ? true : false}
						next={() => setSize(size + 1)}
						loader={<span>loading</span>}
						tw='grid gap-y-7 pb-10 grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 justify-items-center'
					>
						{data.map((playlist) =>
							playlist.items.map((p) => <PlaylistCard key={p.id} image={p.image} name={p.name} id={p.id} />),
						)}
					</InfiniteScroll>
				)}
			</div>
		</div>
	);
};
export default DashboardView;
//TODO add xs:grid-cols-3 to infinite scroll - needs twin.macro or tailwind fix
