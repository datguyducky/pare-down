import React from 'react';
import styled, { keyframes } from 'styled-components';


const bounceDelay = keyframes`
	0%, 80%, 100% { 
    	transform: scale(0);
	}

	40% { 
    	transform: scale(1.0);
  	}
`
const Rect1 = styled.div``
const Rect2 = styled.div``
const Rect3 = styled.div``
const StyledSpinner = styled.div`
	margin: auto;
	padding: 12px 0;
	text-align: center;

	div {
		width: 12px;
		height: 12px;
		background-color: var(--text1);
	  
		border-radius: 100%;
		display: inline-block;
		animation: ${bounceDelay} 1.4s infinite ease-in-out both;
		margin-right: 4px;
		:last-of-type {
			margin-right: 0;
		}
	}

	${Rect1} {
		animation-delay: -0.32s;
	}
	${Rect2} {
		animation-delay: -0.16s;
	}
`


const Spinner = () => {
	return (
		<StyledSpinner>
			<Rect1/>
			<Rect2/>
			<Rect3/>
		</StyledSpinner>
	)
} 

export default Spinner;