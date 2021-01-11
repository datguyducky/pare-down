interface UseDataType {
	isLoading: boolean;
	isError: unknown;
}

export interface UseUserType extends UseDataType {
	data: {
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
	data?: {
		items: Array<_SpotifyPlaylist>;
		limit: number;
		next: string | null;
		offset: number;
		total: number;
	};
}

export interface _SpotifyOwnerType {
	external_urls: { [key: string]: string };
	href: string;
	id: string;
	type: string;
	uri: string;
	display_name: string;
}

export interface UsePlaylistDetailsType extends UseDataType {
	data: {
		collaborative: boolean;
		description: string;
		followersNum: number;
		href: string;
		id: string;
		name: string;
		owner: _SpotifyOwnerType;
		public: boolean;
		tracksTotal: number;
		type: string;
		image: string;
	};
}

export interface _SpotifyTrack {
	added_at: string;
	albumName: string;
	artists: Array<string>;
	id: string;
	name: string;
	type: string;
	duration_ms: number;
}

export interface UsePlaylistTracksType extends UseDataType {
	data: {
		items: Array<_SpotifyTrack>;
		offset: number;
		total: number;
		limit: number;
		next: string;
	};
}
