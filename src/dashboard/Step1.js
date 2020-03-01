import React, { useState } from "react";
import styled from 'styled-components';


const StyledStep1 = styled.div`
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

	#cb-label {
		display: flex;
		align-items: center;

		& > span {
			margin-left: 6px;
			text-transform: none;
		}
	}

	& > #p-title {
		max-width: 100%;
		margin-bottom: 21px;
		border-radius: 4px;
		border: solid 1px var(--gray3);
		background-color: var(--gray2);
		padding: 6px 12px;
		color: var(--text1);
	}

	& > #p-desc {
		max-width: 100%;
		margin-bottom: 21px;
		border-radius: 4px;
		border: solid 1px var(--gray3);
		background-color: var(--gray2);
		padding: 6px 12px;
		color: var(--text1);
		font-size: 14px;
		resize: none;
		height: 190px;
	}

	& > #p-privacy {
		width: 21px;
		height: 21px;
	}
`


const Step1 = (props) => {
	return (
		<StyledStep1>
			<label htmlFor='p-title'>title <span id='input-req'>(required)</span></label>
			<input type='text' id='p-title' required/>

			<label htmlFor='p-desc'>Description</label>
			<textarea id='p-desc' defaultValue='Here is the playlist description (optional)'/>

			<label>other options</label>
			<label htmlFor='p-privacy' id='cb-label'>
				<input type="checkbox" id="p-privacy"/> 
				<span>Set Privacy as Public</span>
			</label>
		</StyledStep1>
	)
}
export default Step1;