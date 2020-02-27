import React from 'react';
import { ButtonBorder } from '../components';
import { Menu, X } from 'react-feather';
import styled from 'styled-components';

const NavWrapper = styled.nav`
	display: flex;
	margin-left: auto;
	color: var(--text1);
	font-weight: 600;
	font-size: 16px;
	letter-spacing: 0.6px;
	line-height: 2em;
`
const NavContent = styled.ul`
	display: flex;
	list-style: none;
	color: inherit;
	padding: 0;
	margin: 4px 0;

	@media (max-width: 960px) {
		display: none !important;
	}
`
const NavLink = styled.li`
	& > a {
		color: inherit;
		text-decoration: none;
		padding: 4px 8px;
		margin-right: 10px;
	}

	:last-of-type > a {
		font-size: 15px;
		font-weight: normal;
		border-left: 1px solid var(--text1);
		padding-left: 18px;
		color: #b6b6ba;
		margin-right: 0;
		margin-left: 10px; /* to make buttonBorder to have same margin as rest of navbar */
	}
`
const NavMobile = styled.div`
	display: none;
	justify-content: center;
	align-items: center;
	margin-top: 4px;
	height: 32px;
	cursor: pointer;

	@media (max-width: 960px) {
		display: flex;
	} 
`
const NavMobileContent = styled.ul`
	position: absolute;
	left: 0;
	top: 0;
	background-color: var(--gray1);
	width: 100%;
	height: 100vh;
	z-index: 100;
	display: none;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& > li {
		margin: 16px 0;
		:last-child > a {
			font-weight: normal;
			color: #b6b6ba;
			font-size: 24px;
		}
	}

	& > li > a {
		color: inherit;
		text-decoration: none;
		font-size: 32px;
	}
`
const StyledX = styled(X)`
	position: absolute;
	top: 0;
	right: 0;
	padding: 24px;
`


export default function Nav() {
	const closeMobile = (o) => {
		let mobile = document.getElementById('nav-m-btn');

		mobile.style.display = o === true ? 'none' : 'flex';
		document.getElementsByTagName('body')[0].style.overflow = o === true ? 'auto' : 'hidden';
	}

	return (
		<NavWrapper>
			<NavContent>
				<NavLink><a href='#pricing'>Pricing</a></NavLink>
				<NavLink><a href='#features'>Features</a></NavLink>
				<NavLink><a href='#faq'>FAQ</a></NavLink>
				<NavLink>
					<ButtonBorder
						href = '/dashboard'
						text = 'Go to the app'
						display = 'inline'
						bSize = '2px'
						bColor = 'var(--brand)'
					/>
				</NavLink>
				<NavLink><a href='#'>English</a></NavLink>
			</NavContent>

			<NavMobile>
				<Menu size={28} onClick={() => { closeMobile(false) }}/>
				<NavMobileContent id='nav-m-btn'>
					<StyledX className='nav-mobile-close' size={28} onClick={() => { closeMobile(true) }}/>
					<li><a href='#pricing' onClick={closeMobile}>Pricing</a></li>
					<li><a href='#features' onClick={closeMobile}>Features</a></li>
					<li><a href='#faq' onClick={closeMobile}>FAQ</a></li>
					<li><a href='#' onClick={closeMobile}>English</a></li>
				</NavMobileContent>
			</NavMobile>
		</NavWrapper>
	)
}