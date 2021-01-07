import useSWR from 'swr';

export function UseUser() {
	const { data, error } = useSWR('/api/current-user');
	return {
		user: data,
		isLoading: !error && data,
		isError: error,
	};
}
