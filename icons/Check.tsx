import { FC } from 'react';
import { IconType } from './types';

const Check: FC<IconType> = ({ iconStyle }) => {
	return (
		<svg css={[iconStyle]} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
		</svg>
	);
};
export default Check;
