import queryString from 'query-string';
import { GET_ACCESS_TOKEN } from './types/spotify';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_url = process.env.SPOTIFY_REDIRECT_URL;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async (authCode: string): Promise<GET_ACCESS_TOKEN> => {
	const response = await fetch(TOKEN_ENDPOINT, {
		method: 'POST',
		headers: {
			Authorization: `Basic ${basic}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: queryString.stringify({
			grant_type: 'authorization_code',
			code: authCode,
			redirect_uri: redirect_url,
		}),
	});

	return response.json();
};

const CURRENT_USER_ENDPOINT = `https://api.spotify.com/v1/me`;
export const getCurrentUser = (access_token: string) => {
	return fetch(CURRENT_USER_ENDPOINT, {
		headers: {
			'Authorization': 'Bearer ' + access_token,
		},
	});
};
