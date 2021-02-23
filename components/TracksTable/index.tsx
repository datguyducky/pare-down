import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import { TableRow } from './TableRow';
import { UsePlaylistTracks } from 'data';
import { TracksSmallTable } from '../TracksSmallTable';

const StyledTable = styled.table(() => [
	`
	tbody tr, thead tr {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 140px 45px;
	}
	`,

	tw`w-full text-left hidden lg:block`,
]);

const StyledSmallTable = styled.table(() => [
	`
	tbody tr, thead tr {
		display: grid;
		grid-template-columns: 1fr;

		@media (min-width: 440px) { 
			grid-template-columns: 1fr 90px;
		}
	}
	`,

	tw`w-full text-left block lg:hidden`,
]);

export const TracksTable: React.FC<{ playlistId: string | string[]; tracksTotal: number }> = ({
	playlistId,
	tracksTotal,
}) => {
	const [recentlyAdded, setRecentlyAdded] = useState<boolean>(true);
	const offset = recentlyAdded ? tracksTotal - 25 : 0;
	const { data: playlistTracks, mutate: mutatePlaylistTracks } = UsePlaylistTracks(playlistId, offset, 25);

	return (
		<>
			<span tw='ml-auto text-sm tracking-wide italic text-white text-opacity-70 mr-4 text-center lg:mr-0 xs:text-left'>
				Displaying the {recentlyAdded ? 'last' : 'first'} {tracksTotal < 25 ? tracksTotal : '25'} songs added to a
				playlist.
			</span>
			<StyledTable>
				<thead tw='w-full block leading-loose tracking-wider uppercase text-xs border-b border-bgray-lightest border-opacity-50'>
					<tr>
						<th tw='pb-3 px-6 text-white text-opacity-70'>Title</th>
						<th tw='pb-3 text-white text-opacity-70'>Artist</th>
						<th tw='pb-3 text-white text-opacity-70'>Album</th>
						<th tw='pb-3 text-white text-opacity-70 hover:text-opacity-100 '>
							<button
								tw='ml-1 flex items-center'
								onClick={() => {
									setRecentlyAdded((recentlyAdded) => !recentlyAdded);
									mutatePlaylistTracks();
								}}
							>
								<svg
									tw='w-4 h-4 mr-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
								{recentlyAdded ? (
									<svg
										tw='w-5 h-5 text-bblue'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
											clipRule='evenodd'
										/>
									</svg>
								) : (
									<svg
										tw='w-5 h-5 text-bblue'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								)}
							</button>
						</th>
						<th tw='pb-2 text-white text-opacity-70 cursor-pointer'>
							<svg
								tw='w-4 h-4'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</th>
					</tr>
				</thead>
				<tbody tw='w-full block'>
					{playlistTracks && playlistTracks?.items.map((track) => <TableRow track={track} key={track.id} />)}
				</tbody>
			</StyledTable>
			<StyledSmallTable>
				<thead tw='mx-8 block leading-loose tracking-wider uppercase text-xs border-b border-bgray-lightest border-opacity-50'>
					<tr>
						<th tw='pb-3 text-white text-opacity-70'>Track</th>
						<th tw='pb-3 text-white text-opacity-70 hidden xs:block hover:text-opacity-100'>
							<button
								tw='ml-1 flex items-center'
								onClick={() => {
									setRecentlyAdded((recentlyAdded) => !recentlyAdded);
									mutatePlaylistTracks();
								}}
							>
								<svg
									tw='w-4 h-4 mr-1'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
									/>
								</svg>
								{recentlyAdded ? (
									<svg
										tw='w-5 h-5 text-bblue'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'
											clipRule='evenodd'
										/>
									</svg>
								) : (
									<svg
										tw='w-5 h-5 text-bblue'
										fill='currentColor'
										viewBox='0 0 20 20'
										xmlns='http://www.w3.org/2000/svg'
									>
										<path
											fillRule='evenodd'
											d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
											clipRule='evenodd'
										/>
									</svg>
								)}
							</button>
						</th>
					</tr>
				</thead>
				<tbody tw='w-full block px-8'>
					<TracksSmallTable playlistTracks={playlistTracks?.items} withSort />
				</tbody>
			</StyledSmallTable>
		</>
	);
};
