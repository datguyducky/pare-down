import React from "react";
import styled from 'styled-components';


const StyledPlaylistCard = styled.div`
	display: flex;
	flex-direction: column;
	padding: 8px 14px;
	border: 1px solid var(--gray3);
	border-top: none;
	cursor: default;

	& > p {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 1.2px;
		margin: auto 0;
	}

	& > div {
		margin-top: 6px;
		font-size: 12px;
		font-style: normal;
		color: var(--text2);

		span:first-of-type {
			border-right: 1px solid var(--text3);
			padding-right: 6px;
			margin-right: 6px;
		}
	}

`


const PlaylistTrackSmall = (props) => {
	const p = props.playlist;

	
	return (
		<StyledPlaylistCard className={props.classProp}>
			<p>{p.name}</p>
			
			<div>
				<span>{p.artists}</span>
				<span>{p.album}</span>
			</div>
		</StyledPlaylistCard>
	)
}

export default PlaylistTrackSmall;