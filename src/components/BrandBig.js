import React from 'react';
import { Copy } from 'react-feather';
import styled from 'styled-components';

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
			<Copy size={28}/><span style={{marginLeft: 4}}> PareDown </span>
		</BrandBigWrapper>
	)
}