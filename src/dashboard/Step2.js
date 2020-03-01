import React, { useState } from "react";
import styled from 'styled-components';
import { ArrowDown, ArrowUp } from 'react-feather';
import PlaylistTrackSmall from './PlaylistTrackSmall';



const StyledStep2 = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > label {
		color: var(--text2);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.6px;

		#input-req {
			color: var(--brand);
			text-transform: lowercase;
		}
	}

	& > #p-number {
		max-width: 100%;
		margin-bottom: 21px;
		border-radius: 4px;
		border: solid 1px var(--gray3);
		background-color: var(--gray2);
		padding: 6px 12px;
		color: var(--text1);
	}
`
const OrderBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: var(--gray2);
	font-weight: 500;
	font-size: 16px;
	cursor: pointer;
	color: var(--text2);
	border: 1px solid var(--gray3);
	width: 110px;

	:hover {
		opacity: 0.8;
	}

	& > span {
		margin: 6px 0;
		margin-left: 4px;
	}
`
const OrderWrapper = styled.div`
	display: flex;
	align-items: center;

	& > p {
		margin-left: 6px;
		text-transform: uppercase;
		font-size: 18px;
		color: var(--brand);
	}
`
const TracksWrapper = styled.div`
	margin-top: 8px;
	border-top: 1px solid var(--gray3);
	border-bottom: 1px solid var(--gray3);
	background-color: var(--gray2);
	overflow-y: scroll;
	height: 348px;
`


const Step2 = (props) => {
	const userTracks = props.userTracks;

	const orderBtnHandler = () => {
		userTracks.reverse();
	}

	return (
		<StyledStep2>
			<label htmlFor='p-title'>number of songs <span id='input-req'>(required)</span></label>
			<input type='text' id='p-number' required/>

			<OrderWrapper>
				<OrderBtn onClick={orderBtnHandler}>
					<ArrowDown size={16}/>
					<span>Order by</span>
				</OrderBtn>
				
				<p>
					displaying 100 songs
				</p>
			</OrderWrapper>

			<TracksWrapper>
				{
					userTracks
					? userTracks.map((p, i) => 
						<PlaylistTrackSmall
							playlist={p} 
							key={i}
						/>
					)
					: null
				}
			</TracksWrapper>
		</StyledStep2>
	)
}
export default Step2;