import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
	display: ${props => props.display || "block"};
	border-radius: 4px;
	border: ${props => props.bsize || "0"} solid ${props => props.bcolor || "none"};

	:hover {
		background-color: var(--text1);
		border-color: var(--text1) !important;
		color: var(--gray1) !important;
	}
`


const ButtonBorder = props => {
	const  { href, text, bSize, display, bColor, id } = props;


	return (
		<StyledLink to={href}
			display={display}
			bsize={bSize}
			bcolor={bColor}
			id={id}
		>
			{text}
		</StyledLink>
	)
}

export default ButtonBorder;