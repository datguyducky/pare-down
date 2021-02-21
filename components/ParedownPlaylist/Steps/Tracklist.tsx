import { TracksSmallTable } from '@/components';
import { UsePlaylistTracksPages } from 'data';
import { FC, Dispatch, SetStateAction } from 'react';
import tw from 'twin.macro';
import { ParedownDetails } from '../';

/* 
	TODO:
	- tracks "sort by" functionality (button, find and fix bugs caused by that change)
	- display text how many tracks will be added to the pared down playlist (number and & (?))
	- paredownDetails state change - add "real value" key - used to store num of tracks that user whishes to use to pare down the playlist (mostly needed when % in input are used)
*/
const Tracklist: FC<{
	paredownDetails: ParedownDetails;
	setParedownDetails: Dispatch<SetStateAction<ParedownDetails>>;
	playlistId: string;
}> = ({ paredownDetails, setParedownDetails, playlistId }) => {
	function tracksNumValidate(value: number) {
		// TODO?: value = value > 0 ? value : 1;
		if (paredownDetails.tracksIsPercent && value >= 100) {
			// when input uses percents, then don't let the user type a number bigger than 100
			setParedownDetails((prevState) => {
				return { ...prevState, tracksTotal: 100 };
			});
		} else if (!paredownDetails.tracksIsPercent && value >= paredownDetails.tracksMax) {
			// when input don't uses percents, then don't let the user type a number bigger than the number of tracks in that playlist
			setParedownDetails((prevState) => {
				return { ...prevState, tracksTotal: prevState.tracksMax };
			});
		} else {
			// save value typed by user in state
			setParedownDetails((prevState) => {
				return { ...prevState, tracksTotal: value };
			});
		}
	}

	const { data, size, setSize } = UsePlaylistTracksPages(playlistId);

	return (
		<div>
			<div tw='flex flex-col'>
				<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
					Number of Songs
				</label>
				<div tw='flex mb-6 items-center'>
					<input
						id='playlist-name'
						type='number'
						tw='text-black rounded-l-sm pl-2 pr-0.5 py-0.5'
						value={paredownDetails.tracksTotal}
						onChange={(e) => {
							tracksNumValidate(parseInt(e.target.value));
						}}
						min={1}
						max={paredownDetails.tracksIsPercent ? 100 : paredownDetails.tracksMax}
					/>
					<button
						css={[
							tw`px-2 py-0.5 rounded-r-sm h-full font-semibold`,
							paredownDetails.tracksIsPercent ? tw`bg-bblue text-white` : tw`bg-white text-bgray`,
						]}
						onClick={() => {
							if (paredownDetails.tracksIsPercent !== true) {
								if (paredownDetails.tracksTotal >= 100) {
									// set number of tracks to pare down to 100, when user switch to use percents and the number of
									// tracks was set to at least than 100
									setParedownDetails((prevState) => {
										return { ...prevState, tracksTotal: 100 };
									});
								}
							} else {
								if (paredownDetails.tracksTotal >= 90) {
									// set number of tracks to pare down to number of tracks in an original playlist, when user switch to not use perecents any longer
									// and the number of tracks was set to at least than 90
									setParedownDetails((prevState) => {
										return { ...prevState, tracksTotal: prevState.tracksMax };
									});
								}
							}

							setParedownDetails((prevState) => {
								return { ...prevState, tracksIsPercent: !prevState.tracksIsPercent };
							});
						}}
					>
						%
					</button>
				</div>

				{data && data.length > 0 && playlistId && (
					<>
						<table tw='w-full text-left block overflow-y-auto' css={{ height: 366 }}>
							<tbody tw='w-full block'>
								{data.map((tracksPage, index) => (
									<TracksSmallTable playlistTracks={tracksPage.items} key={index} />
								))}
							</tbody>
						</table>
						{data[data.length - 1].next && data[data.length - 1].limit >= 100 && (
							<button
								tw='my-2 rounded-sm py-1 bg-bgray-lightest bg-opacity-50 font-bold tracking-wider'
								onClick={() => {
									const tracksLimitDif = paredownDetails.tracksTotal - data[data.length - 1].next;
									data[data.length - 1].limit =
										tracksLimitDif > 0 ? (tracksLimitDif < 100 ? tracksLimitDif : 100) : 100;
									setSize((size) => size + 1);
								}}
							>
								Load More
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};
export default Tracklist;
