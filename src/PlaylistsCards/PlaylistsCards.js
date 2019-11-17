import React, {Component} from 'react';
import './PlaylistsCards.css';

export default class PlaylistsCards extends Component {
    render() {
        let playlist = this.props.playlist;
        let updateStep = this.props.updateStep;

		//after user click on one of his playlists we set state with selected playlist id, and set step state to 2
        return (
            <div className="playlist" onClick={() => updateStep({step: 2, id: this.props.playlist.id})}>
				<p className="playlist__song-count">Number of songs: {playlist.songsNum}</p>
				<div className="playlist__cover">
					<img src={playlist.imageUrl} className="playlist__cover--img" alt={playlist.name} title={playlist.name}/>
				</div>
				<p className="playlist__name">{playlist.name}</p>
		 	 </div>
        )
    }
}