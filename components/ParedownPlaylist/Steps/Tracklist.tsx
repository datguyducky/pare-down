import { FC, Dispatch, SetStateAction } from 'react';
import 'twin.macro';
import { ParedownDetails } from '../';

const Tracklist: FC<{
	paredownDetails: ParedownDetails;
	setParedownDetails: Dispatch<SetStateAction<ParedownDetails>>;
	playlistId: string;
}> = ({ paredownDetails, setParedownDetails, playlistId }) => {
	return (
		<div tw='grid grid-cols-3'>
			<div tw='flex flex-col'>
				<label htmlFor='playlist-name' tw='text-sm mb-0.5 font-semibold text-white text-opacity-70'>
					Number of Songs
				</label>
				<input
					id='playlist-name'
					type='number'
					tw='text-black rounded-sm px-2 py-0.5 mb-6'
					value={paredownDetails.tracksTotal}
					onChange={(e) => setParedownDetails({ ...paredownDetails, tracksTotal: parseInt(e.target.value) })}
				/>
			</div>
		</div>
	);
};
export default Tracklist;
