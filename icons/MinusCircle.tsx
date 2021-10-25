import { FC } from 'react';
import { IconType } from './types';

const MinusCircle: FC<IconType> = ({ iconStyle }) => {
	return (
		<svg css={[iconStyle]} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
			<path
				fillRule='evenodd'
				d='M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z'
				clipRule='evenodd'
			/>
		</svg>
	);
};
export default MinusCircle;
