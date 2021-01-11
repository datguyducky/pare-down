import type { NextApiHandler } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

const playlistTracksHandler: NextApiHandler = async (req, res) => {
	// retrieve HttpOnly and secure cookie which stores users acess-token to the Spotify API
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];
	// retrieve dynamic playlist id
	const {
		query: { playlistId, offset, limit },
	} = req;

	// make call to retrieve user data
	await axios
		.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${offset}&limit=${limit}`, {
			headers: {
				'Authorization': 'Bearer ' + _ACCESS_TOKEN,
			},
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				const data = response.data;
				// return from the API call only the data is needed on the frontend
				const newData = {
					offset: data.offset,
					total: data.total,
					limit: data.limit,
					next: data.next,
					items: data.items.map((i) => ({
						added_at: i.added_at,
						albumName: i.track.album.name,
						artists: i.track.artists.map((a) => a.name),
						id: i.track.id,
						name: i.track.name,
						type: i.track.type,
						duration_ms: i.track.duration_ms,
					})),
				};

				if (offset !== '0') {
					newData.items.reverse();
				}

				// send response status
				res.status(200).json(newData);
				res.end();
				return;
			}
		})
		.catch((error) => {
			// catch error and send error message back to frontend, where useSWR can do its magic
			if (error.response) {
				res.statusCode = error.response.status;
				res.send(error.response.data);
				res.end();
				return;
			}
		});
};
export default playlistTracksHandler;
