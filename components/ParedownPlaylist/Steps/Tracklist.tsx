import { TracksSmallTable } from '@/components';
import { UsePlaylistTracksPages } from 'data';
import { FC, Dispatch, SetStateAction, useEffect } from 'react';
import tw from 'twin.macro';
import { ParedownDetails } from '../';

/* 
	TODO:
	- tracks "sort by" functionality (button, find and fix bugs caused by that change) [?]
*/
const Tracklist: FC<{
	paredownDetails: ParedownDetails;
	setParedownDetails: Dispatch<SetStateAction<ParedownDetails>>;
	playlistId: string;
}> = ({ paredownDetails, setParedownDetails, playlistId }) => {
	function tracksNumValidate(value: number) {
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
				return {
					...prevState,
					tracksTotal: value,
					tracksRealTotal: paredownDetails.tracksIsPercent
						? parseInt(((prevState.tracksMax * value) / 100).toFixed(0))
						: value,
				};
			});
		}
	}

	const { data, setSize } = UsePlaylistTracksPages(playlistId);
	useEffect(() => {
		if (data && data.length > 0) {
			if (data[0].items.length >= 4) {
				const images = [];
				for (let i = 0; i < 4; i++) {
					images.push(data[0].items[i].albumImage);
				}

				setParedownDetails((prevState) => {
					return { ...prevState, imgArr: images };
				});
			} else if (data[0].items.length >= 1) {
				setParedownDetails((prevState) => {
					return { ...prevState, imgArr: [data[0].items[0].albumImage] };
				});
			}
		}
		//eslint-disable-next-line
	}, [data]);

	return (
		<div>
			<div tw='flex flex-col flex-1'>
				<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
					Number of Songs
				</label>
				<div tw='flex items-center'>
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
									// set number of tracks to pare down to 100, when user switch to use percentages and the number of
									// tracks was set to at least more than 100
									setParedownDetails((prevState) => {
										return {
											...prevState,
											tracksTotal: 100,
											tracksRealTotal: prevState.tracksMax,
										};
									});
								}
							} else {
								if (paredownDetails.tracksTotal >= 90) {
									// set number of tracks to pare down to number of tracks in an original playlist, when user switch to stop using percentages any longer
									// and the number of tracks was set to at least than 90
									setParedownDetails((prevState) => {
										return { ...prevState, tracksTotal: prevState.tracksMax, tracksRealTotal: prevState.tracksMax };
									});
								}
							}

							setParedownDetails((prevState) => {
								return {
									...prevState,
									tracksIsPercent: !prevState.tracksIsPercent,
									tracksRealTotal: !prevState.tracksIsPercent
										? parseInt(((prevState.tracksMax * prevState.tracksTotal) / 100).toFixed(0))
										: prevState.tracksTotal,
								};
							});
						}}
					>
						%
					</button>
				</div>
				<h4 tw='mb-6 text-sm mt-1.5 tracking-wide text-white text-opacity-70'>
					The pared down playlist will contain{' '}
					{isNaN(paredownDetails.tracksRealTotal) ? 0 : paredownDetails.tracksRealTotal} songs.
				</h4>

				{data && data.length > 0 && playlistId && (
					<>
						<table tw='w-full text-left block overflow-y-auto' css={{ height: 354 }}>
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
									const tracksLimitDif = paredownDetails.tracksRealTotal - data[data.length - 1].next;
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
