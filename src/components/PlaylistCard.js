import React from 'react';

import './styles/PlaylistCard.css';


export default function Header(props) {
	const playlist = props.playlist;

	return (
		<div className='playlist-card'>
			<img src={playlist.cover} alt={playlist.name + 'cover'}/>
			
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