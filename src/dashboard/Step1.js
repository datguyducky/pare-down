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
	const newPlaylist = props.newPlaylist;

	const inputHandle = (e) => {
		const target = e.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;


		return props.setNewPlaylist({...newPlaylist, [name]: value})
	}


	return (
		<StyledStep1>
			<label htmlFor='p-title'>title <span id='input-req'>(required)</span></label>
			<input
				name='new_title'
				type='text' 
				id='p-title' 
				required 
				placeholder={
					newPlaylist.new_title.length === 0
					? props.title
					: newPlaylist.new_title
				}
				onChange={e => inputHandle(e)}
			/>

			<label htmlFor='p-desc'>Description</label>
			<textarea
				name='new_desc'
				id='p-desc'
				placeholder={
					newPlaylist.new_desc.length === 0
					? 'Here is the playlist description (optional)'
					: newPlaylist.new_desc
				}
				onChange={e => inputHandle(e)}
			/>

			<label>other options</label>
			<label htmlFor='p-privacy' id='cb-label'>
				<input 
					name='new_privacy'
					type="checkbox" 
					id="p-privacy"
					checked={newPlaylist.new_privacy}
					onChange={e => inputHandle(e)}
				/> 
				<span>Set Privacy as Public</span>
			</label>
		</StyledStep1>
	)
}
export default Step1;