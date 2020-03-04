import React from 'react';
import styled from 'styled-components';

const WarningWrapper = styled.div`
	position: absolute;
	justify-content: center;
	align-items: center;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	z-index: 200;
	background-color: rgba(0, 0, 0, 0.6);
	display: ${props => props.display || 'flex'};
`

const StyledWarning = styled.div`
	height: ${props => props.h || '0'};
	width: ${props => props.w || '0'};
	background-color: ${props => props.bgcolor || 'var(--gray1)'};
	color: ${props => props.color || 'var(--text1)'};
	font-size: ${props => props.fsize || '16px'};
	border: 1px solid ${props => props.bcolor || 'var(--text1)'};
	border-radius: 4px;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	& > h1 {
		font-size: 24px;
		font-weight: 700;
		text-align: center;
		width: 80%;
		color: var(--gray3);
	}

	& > p {
		text-align: center;
		width: 90%;
		margin: 16px 0;
	}
`
const BtnWrapper = styled.div`
	display: flex;
`
const WarningBtn = styled.button`
	border-radius: 4px;
	border: 1px solid var(--gray3);
	padding: 12px 30px;
	color: var(--text1);
	cursor: pointer;

	:first-of-type {
		margin-right: 12px;
	}

	&#no {
		background-color: #ed373a;
	}

	&#yes {
		background-color: #1ed760;
	}

	:active, :hover {
		opacity: 0.9;
	}
`


const Warning = props => {
	const  { text, bgColor, color, fSize, width, height, bColor, display, header } = props;


	return (
		<WarningWrapper display={display}>
			<StyledWarning
				bgcolor={bgColor}
				color={color}
				fsize={fSize}
				w={width}
				h={height}
				bcolor={bColor}
				id='warning-card'
				style={{
					display: 'flex'
				}}
			>
				<h1>{header}</h1>
				
				<p>
					{text}
				</p>

				<BtnWrapper>
					<WarningBtn id='no' onClick={() => props.no_action()}>No</WarningBtn>
					
					<WarningBtn id='yes' onClick={() => props.yes_action()}>
						Yes
					</WarningBtn>
				</BtnWrapper>
			</StyledWarning>
		</WarningWrapper>
	)
}

export default Warning;