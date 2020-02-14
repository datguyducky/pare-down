import React from 'react';
import BrandBig from './BrandBig'
import Nav from './Nav';

import './styles/Header.css';


export default function Header() {
	return (
		<header className='header-wrapper'>
			<a href='' className="brand-href">
				<BrandBig/>
			</a>
			<Nav />
		</header>
	)
}