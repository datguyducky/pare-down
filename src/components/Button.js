import React from 'react';


const Button = props => {
	const  { href, text, bgColor, color, className } = props;


	return (
		<a href={href} style={{
			borderRadius: 4,
			backgroundColor: bgColor,
			color: color,
			boxShadow: '3px 3px 6px 0 rgba(0, 0, 0, 0.4)',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		}}
			className={className}
		>
			{text}
		</a>
	)
}

export default Button;