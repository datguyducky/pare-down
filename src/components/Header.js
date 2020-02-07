import React, {useState} from 'react';
import BrandBig from './BrandBig'
import ButtonBorder from './ButtonBorder';

import './styles/Header.css';


export default function Header() {
	return (
		<header className='headerWrapper'>
			<a href='' className="brandHref">
				<BrandBig/>
			</a>
			
			<nav className='navWrapper'>
				<ul>
					<li><a href='#'>Pricing</a></li>
					<li><a href='#'>Features</a></li>
					<li><a href='#'>FAQ</a></li>
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
			</nav>
		</header>
	)
}