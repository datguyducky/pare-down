import type { NextApiHandler } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

const playlistsListHandler: NextApiHandler = async (req, res) => {
	// retrieve HttpOnly and secure cookie which stores users acess-token to the Spotify API
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];
	const {
		query: { offset },
	} = req;
	const parseOffset = offset ? offset : 0;

	// make call to retrieve user data
	await axios
		.get(`https://api.spotify.com/v1/me/playlists?limit=50&offset=${parseOffset}`, {
			headers: {
				'Authorization': 'Bearer ' + _ACCESS_TOKEN,
			},
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				const data = response.data;
				// query string from next url
				const queryString = data.next ? data.next.split('?')[1] : null;
				// list of params
				const nextParams = new URLSearchParams(queryString);

				// return from the API call only the data is needed on the frontend
				const newData = {
					items: data.items.map((p) => ({
						id: p.id,
						name: p.name,
						image: p?.images[0]?.url,
						description: p.description,
					})),
					limit: data.limit,
					next: parseInt(nextParams.get('offset')),
					offset: data.offset,
					total: data.total,
				};

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
export default playlistsListHandler;
