import React from 'react';
import { BrandBig } from '../components';
import Nav from './Nav';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const HeaderWrapper = styled.header`
	display: flex;
	width: 920px;
	padding: 24px 0;

	@media (max-width: 920px) {
		width: 100%;
	}
`


export default function Header() {
	return (
		<HeaderWrapper>
			<Link to='/'>
				<BrandBig/>
			</Link>

			<Nav />
		</HeaderWrapper>
	)
}