import { serialize } from 'cookie';
import type { NextApiHandler } from 'next';
import { getAccessToken } from '../../lib/spotify';

const callbackHandler: NextApiHandler = async (req, res) => {
	// after the user login with the Spotify account, code is retrieved back from it
	// (as an url param) - which is needed to retrieve the proper user access token for the Spotify API
	const { code } = req.query;
	if (code) {
		// make call to retrieve the proper users access token
		const { access_token, expires_in } = await getAccessToken(String(code));

		// when the access token was succesfully retrieved then save it to the HttpOnly and secure cookie,
		// so it can be used for other calls to Spotify API (it expires after 1 hour - when that happens we just go ahead and
		// and make another call to the API to retrieve a new one)
		if (access_token) {
			res.setHeader(
				'Set-Cookie',
				serialize('access-token', String(access_token), {
					httpOnly: true,
					maxAge: expires_in || 60 * 60,
					secure: true,
				}),
			);
			// status code for redirect
			// here we redirect the user back to the /dashboard view
			res.statusCode = 302;
			res.setHeader('Location', '/dashboard');
			res.end();
			return;
		} else {
			// something went completely wrong and we didn't retrieve a completely new Spotify access token
			res.statusCode = 401;
			res.setHeader('Code', '401 Unauthorized');
			res.send('Error 401 - Access Token is missing');
			res.end();
			return;
		}
	} else {
		// this error can only happen when the user didn't agree to login with his Spotify account
		// redirect user back to the landing page
		res.statusCode = 302;
		res.setHeader('Location', '/');
		res.end();
		return;
	}
};
export default callbackHandler;
