import type { NextApiHandler } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

type playlistDetailsType = {
	collaborative: boolean;
	description: string;
	followers: {
		total: number;
	};
	href: string;
	id: number;
	name: string;
	owner: Record<string, unknown>;
	public: boolean;
	tracks: {
		total: number;
	};
	type: string;
	images: {
		url: string;
	}[];
	external_urls: {
		spotify: string;
	};
};

const playlistDetailsHandler: NextApiHandler = async (req, res) => {
	// retrieve HttpOnly and secure cookie which stores users access-token to the Spotify API
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];
	// retrieve dynamic playlist id
	const {
		query: { playlistId },
	} = req;

	// make call to retrieve user data
	if (req.method === 'GET') {
		await axios
			.get<playlistDetailsType>(
				`https://api.spotify.com/v1/playlists/${playlistId}?fields=collaborative,description,followers,href,id,name,owner,public,tracks(total),type,images,external_urls`,
				{
					headers: {
						'Authorization': 'Bearer ' + _ACCESS_TOKEN,
					},
				},
			)
			.then((response) => {
				if (response.statusText === 'OK') {
					const data = response.data;
					// return from the API call only the data is needed on the frontend
					const newData = {
						collaborative: data.collaborative,
						description: data.description,
						followersNum: data.followers.total,
						href: data.href,
						id: data.id,
						name: data.name,
						owner: data.owner,
						public: data.public,
						tracksTotal: data.tracks.total,
						type: data.type,
						image: data.images[0]?.url || null,
						externalUrl: data.external_urls.spotify,
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
					res.send(error.response.data.error);
					res.end();
					return;
				}
			});
	} else if (req.method === 'DELETE') {
		await axios
			.delete(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, {
				headers: {
					'Authorization': 'Bearer ' + _ACCESS_TOKEN,
				},
			})
			.then((response) => {
				if (response.statusText === 'OK') {
					// send response status
					res.status(204);
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
	} else if (req.method === 'PUT') {
		const {
			data: { name, description, isPublic },
		} = req.body;
		await axios
			.put(
				`https://api.spotify.com/v1/playlists/${playlistId}
		`,
				// TODO: remove playlist description - it looks like is not supported by Spotify API right now
				{
					name: name,
					description: description,
					public: isPublic,
				},
				{
					headers: {
						'Authorization': 'Bearer ' + _ACCESS_TOKEN,
						'Content-Type': 'application/json',
					},
				},
			)
			.then((response) => {
				if (response.statusText === 'OK') {
					// send response status
					res.status(200);
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
	} else {
		res.status(405);
		res.send('Method Mot Allowed');
		res.end();
	}
};
export default playlistDetailsHandler;
