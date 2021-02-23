import { FC } from 'react';
import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import axios from 'axios';

import { withToastProvider } from '@/toast';
import { AppHead, GlobalStyles } from 'components/';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<AppHead />
		<GlobalStyles />
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
