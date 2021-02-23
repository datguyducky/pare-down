import 'twin.macro';
import { _SpotifyTrack } from '../../data/types';
import dayjs from 'dayjs';

export const TableRow: React.FC<{ track: _SpotifyTrack }> = ({ track }) => {
	let ms = track.duration_ms;
	ms = 1000 * Math.round(ms / 1000);
	const trackDurationDate = new Date(ms);
	const trackDurationMinutes =
		trackDurationDate.getUTCMinutes() < 10
			? '0' + trackDurationDate.getUTCMinutes()
			: trackDurationDate.getUTCMinutes();
	const trackDurationSeconds =
		trackDurationDate.getUTCSeconds() < 10
			? '0' + trackDurationDate.getUTCSeconds()
			: trackDurationDate.getUTCSeconds();

	const trackAddedAt = dayjs(track.added_at).format('YYYY-MM-DD');
	return (
		<tr tw='border-b border-bgray-lightest border-opacity-50 text-sm font-semibold'>
			<td tw='py-3 px-6 truncate'>{track.name}</td>
			<td tw='py-3 pr-12 truncate'>
				{track.artists.map((artist, i) =>
					i === track.artists.length - 1 ? <span key={i}>{artist} </span> : <span key={i}>{artist}, </span>,
				)}
			</td>
			<td tw='py-3 pr-12 truncate inline-block w-64'>{track.albumName}</td>
			<td tw='py-3 pr-12 truncate'>{trackAddedAt}</td>
			<td tw='py-3 pl-2 pr-6 truncate'>{trackDurationMinutes + ':' + trackDurationSeconds}</td>
		</tr>
	);
};
