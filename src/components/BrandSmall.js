import React from 'react';
import styled from 'styled-components';
const brand = require('../assets/pare-down.png');


const StyledBrandSmall = styled.div`
	img {
		height: 42px;
		width: 42px;

		@media (max-width: 1060px) {
			height: 34px;
			width: 34px;
		}
	}
`


export default function BrandSmall(props) {
	return (
		<StyledBrandSmall>
			<img 
				src={brand}
				alt='brand icon'
			/>
		</StyledBrandSmall>
	)
}