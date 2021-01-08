interface UseDataType {
	isLoading: boolean;
	isError: unknown;
}

export interface UseUserType extends UseDataType {
	user?: {
		display_name: string;
		id: string;
	};
}

export interface _SpotifyPlaylist {
	id: string;
	name: string;
	image: string;
	description?: string;
}

export interface UseUserPlaylistsType extends UseDataType {
	playlists?: {
		items: Array<_SpotifyPlaylist>;
		limit: number;
		next: string | null;
		offset: number;
		total: number;
	};
}
