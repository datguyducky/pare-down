import { FC } from 'react';
import { IconType } from './types';

const Duplicate: FC<IconType> = ({ iconStyle }) => {
	return (
		<svg css={[iconStyle]} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				strokeWidth={2}
				d='M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
			/>
		</svg>
	);
};
export default Duplicate;
