import { FC } from 'react';
import { IconType } from './types';

const Menu: FC<IconType> = ({ iconStyle }) => {
	return (
		<svg css={[iconStyle]} fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
			<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
		</svg>
	);
};
export default Menu;
