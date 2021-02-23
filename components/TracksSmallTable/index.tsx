import 'twin.macro';
import { _SpotifyTrack } from 'data/types';
import dayjs from 'dayjs';

export const TracksSmallTable: React.FC<{ playlistTracks: Array<_SpotifyTrack>; withSort?: boolean }> = ({
	playlistTracks,
	withSort,
}) => {
	return (
		<>
			{playlistTracks &&
				playlistTracks.map((track) => (
					<tr tw='border-b border-bgray-lightest border-opacity-50 font-semibold inline-block w-full' key={track.id}>
						<td tw='py-2.5 pr-6 flex flex-col overflow-hidden'>
							<span tw='text-base truncate leading-tight'>{track.name}</span>
							<span tw='text-sm text-white text-opacity-70 font-normal truncate'>
								{track.artists.map((artist, i) =>
									i === track.artists.length - 1 ? <span key={i}>{artist} </span> : <span key={i}>{artist}, </span>,
								)}
								<em tw='ml-0.5 mr-1 not-italic'>•</em>
								{track.albumName}
							</span>
						</td>
						{withSort && (
							<td tw='py-2.5 truncate text-base hidden xs:block'>{dayjs(track.added_at).format('YYYY-MM-DD')}</td>
						)}
					</tr>
				))}
		</>
	);
};
