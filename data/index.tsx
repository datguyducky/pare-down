import useSWR from 'swr';
import { UseUserType, UseUserPlaylistsType } from './types';

export const UseUser = (): UseUserType => {
	const { data, error } = useSWR('/api/current-user');
	return {
		user: data,
		isLoading: !error && data,
		isError: error,
	};
};

export const UseUserPlaylists = (): UseUserPlaylistsType => {
	const { data, error } = useSWR('/api/playlists');

	return {
		playlists: data,
		isLoading: !error && data,
		isError: error,
	};
};
