import { FC } from 'react';
import { AppProps } from 'next/app';

import { GlobalStyles } from 'twin.macro';
import { SWRConfig } from 'swr';
import axios from 'axios';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
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

export default App;
