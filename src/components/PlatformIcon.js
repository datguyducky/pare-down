import React from 'react';
import styled from 'styled-components';


const StyledPlatformIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${props => props.bgColor};
	height: ${props => props.h};
	width: ${props => props.w};
	margin-right: ${props => props.mRight || "0px"};
	border-radius: ${props => props.bRadius || "4px"};
	background-image: url('${props => props.icon}');
	background-size: 70%;
	background-repeat: no-repeat;
	background-position: center;

	@media (max-width: 1060px) {
		height: 42px;
		width: 42px;
	}

	@media (max-width: 760px) {
		height: 42px;
		width: 42px;
		margin-right: 12px;
	}
`


const PlatformIcon = props => {
	const  { bgColor, icon, size, bRadius, mRight } = props;


	return (
		<StyledPlatformIcon
			bgColor={bgColor}
			w={size}
			h={size}
			bRadius={bRadius}
			mRight={mRight}
			icon={icon}
		/>
	)
}

export default PlatformIcon;