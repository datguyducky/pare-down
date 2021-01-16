import useSWR from 'swr';
import { UseUserType, UseUserPlaylistsType, UsePlaylistDetailsType, UsePlaylistTracksType } from './types';

export const UseUser = (): UseUserType => {
	const { data, error } = useSWR('/api/current-user');

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};

export const UseUserPlaylists = (): UseUserPlaylistsType => {
	const { data, error } = useSWR('/api/playlists');

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};

export const UsePlaylistDetails = (id: string | string[]): UsePlaylistDetailsType => {
	const { data, error } = useSWR(`/api/playlists/${id}`);

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};

export const UsePlaylistTracks = (id: string | string[], offset: number, limit?: number): UsePlaylistTracksType => {
	limit = limit ? limit : 100;
	offset = offset < 0 ? 0 : offset;
	const { data, error } = useSWR(`/api/playlists/${id}/tracks?offset=${offset}&limit=${limit}`);

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};
