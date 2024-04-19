import type { NextApiHandler } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

type playlistTracksType = {
	next: string;
	offset: number;
	total: number;
	limit: number;
	items: {
		added_at: number;
		track: {
			album: {
				name: string;
				images: {
					url: string;
				}[];
			};
			artists: {
				name: string;
			}[];
			id: string;
			name: string;
			type: string;
			duration_ms: number;
			uri: string;
		};
	}[];
};

const playlistTracksHandler: NextApiHandler = async (req, res) => {
	// retrieve HttpOnly and secure cookie which stores users acess-token to the Spotify API
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];

	// make call to retrieve user data
	if (req.method === 'GET') {
		// retrieve dynamic playlist id
		const {
			query: { playlistId, offset, limit, disableSort },
		} = req;

		const newOffset = offset ? offset : 0;
		const newLimit = limit ? limit : 100;

		await axios
			.get<playlistTracksType>(
				`https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${newOffset}&limit=${newLimit}`,
				{
					headers: {
						'Authorization': 'Bearer ' + _ACCESS_TOKEN,
					},
				},
			)
			.then((response) => {
				if (response.statusText === 'OK') {
					const data = response.data;
					// query string from next url
					const queryString = data.next ? data.next.split('?')[1] : null;
					// list of params
					const nextParams = new URLSearchParams(queryString);

					// return from the API call only the data is needed on the frontend
					const newData = {
						offset: data.offset,
						total: data.total,
						limit: data.limit,
						next: parseInt(nextParams.get('offset')),
						items: data.items.map((i) => ({
							added_at: i.added_at,
							albumName: i.track.album.name,
							albumImage: i?.track?.album?.images?.[0]?.url,
							artists: i.track.artists.map((a) => a.name),
							id: i.track.id,
							name: i.track.name,
							type: i.track.type,
							duration_ms: i.track.duration_ms,
							uri: i.track.uri,
						})),
					};

					if (offset !== '0' && !disableSort) {
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
					res.send(error.response.data.error);
					res.end();
					return;
				}
			});
	} else if (req.method === 'POST') {
		const {
			query: { playlistId },
			body: {
				data: { uris },
			},
		} = req;

		axios
			.post(
				`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
				{
					uris: uris,
				},
				{
					headers: {
						'Authorization': 'Bearer ' + _ACCESS_TOKEN,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((response) => {
				if (response.statusText === 'OK' || response.status === 201) {
					res.status(200).json(response?.data);
					res.end();
					return;
				}
			})
			.catch((error) => {
				if (error.response) {
					res.statusCode = error.response.status;
					res.send(error.response.data.error);
					res.end();
					return;
				}
			});
	} else {
		res.status(405);
		res.send('Method Mot Allowed');
		res.end();
	}
};
export default playlistTracksHandler;
