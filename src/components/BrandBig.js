import React from 'react';
import styled from 'styled-components';
const brand = require('../assets/pare-down.png');


const BrandBigWrapper = styled.div`
	color: var(--text1);
	display: flex;
	align-items: center;
	font-size: 36px;
	font-weight: 600;
`

export default function BrandBig() {
	return (
		<BrandBigWrapper>
			<img 
				src={brand} 
				style={{width: 28, height: 28}} 
				alt='brand icon'
			/>
			<span style={{marginLeft: 4}}> PareDown </span>
		</BrandBigWrapper>
	)
}