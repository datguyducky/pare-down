import React, { useState } from 'react';

import './PlaylistCard.css';


export default function PlaylistCard(props) {
	const playlist = props.playlist;
	return (
		<div className='playlist-card' style={{backgroundImage: `url(${playlist.cover})`}}>
			<div className='playlist-card-info'>
				<span className='playlist-card-n'>
					{playlist.name}
				</span>
				<span className='playlist-card-s'>
					{playlist.service}
				</span>
			</div>
		</div>
	)
}