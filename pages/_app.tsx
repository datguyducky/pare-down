import { FC } from 'react';
import { AppProps } from 'next/app';

import { GlobalStyles } from 'twin.macro';

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
	<>
		<GlobalStyles />
		<Component {...pageProps} />
	</>
);

export default App;
