import useSWR from 'swr';
import { UseUserType, UseUserPlaylistsType, UsePlaylistDetailsType } from './types';

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

export const UsePlaylistDetails = (id: string | string[]): UsePlaylistDetailsType => {
	console.log('data', id);
	const { data, error } = useSWR(`/api/playlists/${id}`);

	return {
		playlistDetails: data,
		isLoading: !error && data,
		isError: error,
	};
};
