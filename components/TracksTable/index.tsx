import { Icons } from '@/icons';
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
			grid-template-columns: 1fr 120px;
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

	console.log(recentlyAdded);
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
								<Icons.Calendar iconStyle={tw`w-4 h-4 mr-1`} />
								{recentlyAdded ? (
									<Icons.ChevronUp iconStyle={tw`w-5 h-5 text-bblue`} />
								) : (
									<Icons.ChevronDown iconStyle={tw`w-5 h-5 text-bblue`} />
								)}
							</button>
						</th>
						<th tw='pb-2 text-white text-opacity-70 cursor-pointer'>
							<Icons.Clock iconStyle={tw`w-4 h-4`} />
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
								<Icons.Calendar iconStyle={tw`w-4 h-4 mr-1`} />
								{recentlyAdded ? (
									<Icons.ChevronUp iconStyle={tw`w-5 h-5 text-bblue`} />
								) : (
									<Icons.ChevronDown iconStyle={tw`w-5 h-5 text-bblue`} />
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
