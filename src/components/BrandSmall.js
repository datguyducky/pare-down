import React from 'react';
import { Copy } from 'react-feather';


export default function BrandSmall() {
	return (
		<div className="BrandSmall">
			<Copy size={42} style={{color: 'var(--text1)'}}/>
		</div>
	)
}