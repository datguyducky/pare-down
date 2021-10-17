import type { NextApiHandler } from 'next';
import queryString from 'query-string';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_url = process.env.SPOTIFY_REDIRECT_URL;

const loginHandler: NextApiHandler = (req, res) => {
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			queryString.stringify({
				response_type: 'code',
				client_id: client_id,
				scope:
					'playlist-read-private playlist-modify-public playlist-modify-private ugc-image-upload playlist-read-collaborative',
				redirect_uri: redirect_url,
			}),
	);
};
export default loginHandler;
