import { serialize } from 'cookie';
import type { NextApiHandler } from 'next';
import { getAccessToken } from '../../lib/spotify';

const callbackHandler: NextApiHandler = async (req, res) => {
	const { code } = req.query;
	if (code) {
		const { access_token, expires_in } = await getAccessToken(String(code));
		if (access_token) {
			res.setHeader(
				'Set-Cookie',
				serialize('access-token', String(access_token), {
					httpOnly: true,
					maxAge: expires_in || 60 * 60,
					secure: true,
				}),
			);
			res.statusCode = 302;
			res.setHeader('Location', '/dashboard');
			res.end();
			return;
		} else {
			res.statusCode = 401;
			res.setHeader('Code', '401 Unauthorized');
			res.send('Error 401 - Access Token is missing');
			res.end();
			return;
		}
	} else {
		res.statusCode = 401;
		res.setHeader('Code', '401 Unauthorized');
		res.send('Error 401 - Code from Spotify API is missing');
		res.end();
		return;
	}
};
export default callbackHandler;
