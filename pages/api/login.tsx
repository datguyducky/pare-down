import type { NextApiHandler } from 'next';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_url = process.env.SPOTIFY_REDIRECT_URL;

const loginHandler: NextApiHandler = (req, res) => {
	res.redirect(
		'https://accounts.spotify.com/authorize?' +
			querystring.stringify({
				response_type: 'code',
				client_id: client_id,
				scope: 'playlist-read-private playlist-modify-public playlist-modify-private ugc-image-upload',
				redirect_uri: redirect_url,
			}),
	);
};
export default loginHandler;