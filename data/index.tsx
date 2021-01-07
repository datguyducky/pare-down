import useSWR from 'swr';

type UseUserType = {
	user?: {
		display_name: string;
		id: string;
	};
	isLoading: boolean;
	isError: unknown;
};

export const UseUser = (): UseUserType => {
	const { data, error } = useSWR('/api/current-user');
	return {
		user: data,
		isLoading: !error && data,
		isError: error,
	};
};
