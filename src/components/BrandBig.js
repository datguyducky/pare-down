import React from 'react';
import { Copy } from 'react-feather';

import './styles/BrandBig.css';


export default function BrandBig() {
	return (
		<div className="BrandBig">
			<Copy size={28}/><span style={{marginLeft: 4}}> PareDown </span>
		</div>
	)
}