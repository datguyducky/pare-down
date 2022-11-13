import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite';
import {
	UseUserType,
	UseUserPlaylistsType,
	UsePlaylistDetailsType,
	UsePlaylistTracksType,
	UsePlaylistTracksPagesType,
} from './types';

export const UseUser = (): UseUserType => {
	const { data, error } = useSWR('/api/current-user');

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};

// TODO: option to mutate this endpoint, needed when pared down playlist is created, or the existing playlist has been unfollowed
export const UseUserPlaylists = (): UseUserPlaylistsType => {
	const getKey = (pageIndex, previousPageData) => {
		// reached the end
		if (previousPageData && !previousPageData.next) return null;

		// first page, we don't have `previousPageData`
		if (pageIndex === 0) return '/api/playlists';

		// add the next (offset) to the API endpoint
		return `/api/playlists?offset=${previousPageData.next}`;
	};

	const { data, size, setSize } = useSWRInfinite(getKey);

	return {
		data: data,
		size: size,
		setSize: setSize,
	};
};

export const UsePlaylistDetails = (id: string | string[]): UsePlaylistDetailsType => {
	const { data, error } = useSWR(id ? `/api/playlists/${id}` : null);

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
	};
};

export const UsePlaylistTracks = (id: string | string[], offset: number, limit?: number): UsePlaylistTracksType => {
	limit = limit ? limit : 100;
	offset = offset <= 0 ? 0 : offset;
	const { data, error, mutate } = useSWR(id ? `/api/playlists/${id}/tracks?offset=${offset}&limit=${limit}` : null);

	return {
		data: data,
		isLoading: !error && data,
		isError: error,
		mutate: mutate,
	};
};

export const UsePlaylistTracksPages = (id: string | string[], limit?: number): UsePlaylistTracksPagesType => {
	const getKey = (pageIndex, previousPageData) => {
		// reached the end
		if (previousPageData && !previousPageData.next) return null;

		// first page, we don't have `previousPageData`
		if (pageIndex === 0)
			return limit
				? id
					? `/api/playlists/${id}/tracks?disableSort=true&limit=${limit}`
					: null
				: id
				? `/api/playlists/${id}/tracks?disableSort=true`
				: null;

		// add the next (offset) to the API endpoint
		return id
			? `/api/playlists/${id}/tracks?offset=${previousPageData.next}&limit=${previousPageData.limit}&disableSort=true`
			: null;
	};

	const { data, size, setSize } = useSWRInfinite(getKey);

	return {
		data: data,
		size: size,
		setSize: setSize,
	};
};
