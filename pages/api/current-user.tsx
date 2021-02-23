import type { NextApiHandler } from 'next';
import axios from 'axios';
import { parse } from 'cookie';

const currentUserHandler: NextApiHandler = async (req, res) => {
	// retrieve HttpOnly and secure cookie which stores users acess-token to the Spotify API
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];
	// make call to retrieve user data
	await axios
		.get('https://api.spotify.com/v1/me', {
			headers: {
				'Authorization': 'Bearer ' + _ACCESS_TOKEN,
			},
		})
		.then((response) => {
			if (response.statusText === 'OK') {
				const data = response.data;
				// return from the API call only the data is needed on the frontend
				const newData = {
					display_name: data.display_name,
					id: data.id,
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
};
export default currentUserHandler;
