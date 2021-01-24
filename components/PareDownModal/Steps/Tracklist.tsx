import { FC, Dispatch, SetStateAction } from 'react';
import { UsePlaylistDetails } from 'data';
import 'twin.macro';

const Tracklist: FC<{
	playlistSongsNum: number;
	setPlaylistSongsNum: Dispatch<SetStateAction<number>>;
	playlistId: string;
}> = ({ playlistSongsNum, setPlaylistSongsNum, playlistId }) => {
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
					value={playlistSongsNum}
					onChange={(e) => setPlaylistSongsNum(parseInt(e.target.value))}
				/>
			</div>
		</div>
	);
};
export default Tracklist;
