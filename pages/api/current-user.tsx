import type { NextApiHandler } from 'next';
import { getCurrentUser } from 'lib/spotify';
import { parse } from 'cookie';

const currentUserHandler: NextApiHandler = async (req, res) => {
	const _ACCESS_TOKEN = parse(req.headers.cookie)['access-token'];
	const response = await getCurrentUser(_ACCESS_TOKEN);
	const responseJSON = await response.json();

	//await new Promise((res) => setTimeout(res, 2000)); for testing purposes
	if (responseJSON.error) {
		res.statusCode = responseJSON.error?.status;
		res.send(responseJSON.error?.message);
		res.end();
		return;
	} else {
		const data = {
			display_name: responseJSON.display_name,
			id: responseJSON.id,
		};
		res.status(200).json(data);
		res.end();
		return;
	}
};
export default currentUserHandler;
