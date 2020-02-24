import React from 'react';

import './styles/PlatformIcon.css';


const PlatformIcon = props => {
	const  { bgColor, name, size, sizeRadius } = props;


	return (
		<div 
			className='platform-icon' 
			style={{
				backgroundColor: bgColor, 
				width: size, 
				height: size, 
				borderRadius: sizeRadius
			}}
		>
			<img src={name} alt={name}/>
		</div>
	)
}

export default PlatformIcon;