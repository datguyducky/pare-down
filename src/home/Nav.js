import React from 'react';
import { ButtonBorder } from '../components';
import { Menu, X, FileText } from 'react-feather';

import './styles/Nav.css';


export default function Nav() {
	const closeMobile = () => {
		let mobile = document.getElementsByClassName('nav-content-mobile')[0];
		mobile.style.display = mobile.style.display === 'flex' ? 'none' : 'flex';
		document.getElementsByTagName('body')[0].style.overflow = 'auto';
	}

	return (
		<nav className='nav-wrapper'>
			<ul className='nav-content'>
				<li><a href='#pricing'>Pricing</a></li>
				<li><a href='#features'>Features</a></li>
				<li><a href='#faq'>FAQ</a></li>
				<li>
					<ButtonBorder
						href = '#'
						text = 'Go to the app'
						display = 'inline'
						bSize = '2px'
						bColor = 'var(--brand)'
						className = 'nav-app'
					/>
				</li>
				<li><a href='#'>English</a></li>
			</ul>
			<div className='nav-wrapper-mobile'>
				<Menu size={28} onClick={() => {
					let mobile = document.getElementsByClassName('nav-content-mobile')[0];
					mobile.style.display = mobile.style.display === 'flex' ? 'none' : 'flex';
					document.getElementsByTagName('body')[0].style.overflow = 'hidden';
				}}/>
				<ul className='nav-content-mobile'>
					<X className='nav-mobile-close' size={28} onClick={closeMobile}/>
					<li><a href='#pricing' onClick={closeMobile}>Pricing</a></li>
					<li><a href='#features' onClick={closeMobile}>Features</a></li>
					<li><a href='#faq' onClick={closeMobile}>FAQ</a></li>
					<li><a href='#' onClick={closeMobile}>English</a></li>
				</ul>
			</div>
		</nav>
	)
}