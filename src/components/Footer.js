import React from 'react';

import './styles/Footer.css';


export default function Footer() {
	return (
		<footer className='footer-overlay'>
			<span>
				Made with <span style={{color: 'red'}}> ❤️ </span> by
				<a href='https://github.com/datguysheepy/pare-down' target='_blank'> @datguysheepy</a>
			</span>
		</footer>
	)
}