import React from "react";
import styled from 'styled-components';


const StyledPlaylistCard = styled.ul`
	display: grid;
	grid-template-columns: auto 1fr 160px 160px 120px 120px;
	grid-gap: 21px;
	padding: 14px;
	border: 1px solid var(--gray3);
	border-top: none;
	cursor: default;

	li {
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 1.2px;
		margin: auto 0;

		:first-of-type {
			font-weight: 600;
		}
	}
`


const PlaylistTrack = (props) => {
	const p = props.playlist;
	
	const addZero = (i) => {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	
	let ms = p.duration_ms;
	ms = 1000*Math.round(ms/1000); // round to nearest second
	let d = new Date(ms);
	let h = addZero(d.getUTCHours());
	let m = addZero(d.getUTCMinutes());
	let s = addZero(d.getUTCSeconds());
	ms = h + ':' + m + ':' + s;

	return (
		<StyledPlaylistCard>
			<li>{props.id + 1}</li>
			<li>{p.name}</li>
			<li>{p.artists}</li>
			<li>{p.album}</li>
			<li style={{color: 'var(--brand)'}}>{props.service}</li>
			<li>{ms}</li>
		</StyledPlaylistCard>
	)
}

export default PlaylistTrack;