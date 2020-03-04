import React from 'react';
const brand = require('../assets/pare-down.png');


export default function BrandSmall() {
	return (
		<div className="BrandSmall">
			<img 
				src={brand}
				style={{
					height: 42,
					width: 42
				}}
				alt='brand icon'
			/>
		</div>
	)
}