import { FC } from 'react';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axios from 'axios';

import { withToastProvider } from '@/toast';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<SWRConfig
			value={{
				fetcher: (url) => axios.get(url).then((res) => res.data),
			}}
		>
			<Component {...pageProps} />
		</SWRConfig>
	</>
);

export default withToastProvider(App);
