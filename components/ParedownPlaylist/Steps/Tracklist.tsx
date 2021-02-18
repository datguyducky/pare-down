import { FC, Dispatch, SetStateAction } from 'react';
import tw from 'twin.macro';
import { ParedownDetails } from '../';

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
			</div>
		</div>
	);
};
export default Tracklist;
