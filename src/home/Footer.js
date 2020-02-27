import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
	background-color: var(--gray2);
	height: 102px;
	width: 100%;
	font-size: 18px;
	font-weight: 600;
	color: var(--text1);
	display: flex;
	justify-content: center;
	align-items: center;

	& > span > a {
		color: var(--brand);
		text-decoration: none;

		:hover {
			opacity: 0.9;
		}
	}
`


export default function Footer() {
	return (
		<StyledFooter>
			<span>
				Made with <span style={{color: 'red'}}> ❤️ </span> by
				<a href='https://github.com/datguysheepy/pare-down' target='_blank'> @datguysheepy</a>
			</span>
		</StyledFooter>
	)
}