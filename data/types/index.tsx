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

export interface OwnerType {
	external_urls: { [key: string]: string };
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name: string;
}

export interface UsePlaylistDetailsType extends UseDataType {
	playlistDetails: {
		collaborative: boolean;
		description: string;
		followersNum: number;
		href: string;
		id: string;
		name: string;
		owner: OwnerType;
		public: boolean;
		tracksTotal: number;
		type: string;
		image: string;
	};
}
