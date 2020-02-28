import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
	box-shadow: 3px 3px 6px 0 rgba(0, 0, 0, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	border-radius: 4px;
	background-color: ${props => props.bgcolor || "var(--brand)"};
	color: ${props => props.color || "var(--text1)"};
	font-weight: 700;
	font-size: ${props => props.fsize || "16px"};
	width: ${props => props.w || "108px"};
	height: ${props => props.h || "36px"};

	:hover {
		opacity: 0.95;
	}
`


const Button = props => {
	const  { href, text, bgColor, color, fSize, width, height, icon } = props;


	return (
		<StyledLink to={href}
			bgcolor={bgColor}
			color={color}
			fsize={fSize}
			w={width}
			h={height}
		>
			{text}
		</StyledLink>
	)
}

export default Button;