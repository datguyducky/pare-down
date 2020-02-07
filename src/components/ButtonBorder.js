import React from 'react';

const ButtonBorder = props => {
	const  { href, text, bSize, display, bColor, className } = props;


	return (
		<a href={href} style={{
			display: display,
			borderRadius: 4,
			border: bSize + ' solid '+ bColor //spacing here is important!!
		}}
			className={className}
		>
			{text}
		</a>
	)
}

export default ButtonBorder;