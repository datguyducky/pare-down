import React, { useEffect } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { X } from 'react-feather';


const GlobalStyle = createGlobalStyle`
 	body {
		overflow: hidden;
	}
`
const PopUpEntrance = keyframes`
	0% {
		transform: scale(.7);
		opacity: 0;
	}
	80% {
		transform: scale(1.05);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
`
const StyledPopUp = styled.div`
	position: absolute;
	top: 0;
	width: 100%;
	background-color: var(--brand);
	padding: 10px 0;
	font-size: 18px;
	text-transform: uppercase;
	font-weight: 700;
	text-align: center;
	cursor: default;
	z-index: 1000;
	animation: ${PopUpEntrance} .15s linear;

	span {
		display: flex;
		justify-content: center;
		align-items: center;

		svg {
			position: absolute;
			right: 12px;
			cursor: pointer;
		}
	}
`


const PopUp = props => {
	const  { text, hide } = props;

	useEffect(() => {
		if(props.load_action) {
			props.load_action();
		}
	})


	return (
		<StyledPopUp>
			<GlobalStyle/>
			<span>
				{text}
				<X size={24} onClick={() => hide()}/>
			</span>
		</StyledPopUp>
	)
}

export default PopUp;