import React, {Component} from 'react';
import './ResultPreview.css';
import queryString from 'query-string';

export default class ResultPreview extends Component {
    constructor() {
        super();
        this.state = {
            uris: [],
            a: [],
        }
    }

    componentDidMount() {
        const USER_TRACK_NUM = this.props.userTrackNum;
        const ID = this.props.id;
        //checking address bar for access token from Spotify API.
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)
            return;

        /*
        1) Making sure if user wants to have more than 0 songs in new playlist.
        2) With Spotify API we can only get 100 songs in one request - so, we send as many request as needed to have array with all uris to songs that number of was typed by user.playlist.
        3) As result of this we have arrays inside one main array that's stored in state: 'uris'.
        */
        if (USER_TRACK_NUM > 0) {
            if (this.props.sort === false) {
                for (let i = 0; i < USER_TRACK_NUM; i += 100) {
                    let limit = 100;
                    let offset = this.props.tracksNum - (i + 100);
                    if (USER_TRACK_NUM - i < 100) {
                        limit = USER_TRACK_NUM - i;
                        offset = this.props.tracksNum - i - limit;
                    }

                    fetch(`https://api.spotify.com/v1/playlists/${ID}/tracks?fields=items(track(uri, album.images))&limit=${limit}&offset=${offset}`, {
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            }
                        })
                        .then(response => response.json())
                        //Apart from songs uris, we also create state 'img4' that stores links of covers of first 4 songs (in an array).
                        .then(data => this.setState(prevState => ({
                            uris: [...prevState.uris, data.items.reverse().map((id) => id.track.uri)],
                            img4: data.items.slice(0, 4).map((id) => id.track.album.images[1].url),
                        })))
                }
            } else if (this.props.sort === true) {
                for (let i = 0; i < USER_TRACK_NUM; i += 100) {
                    let limit = 100
                    if (USER_TRACK_NUM - i < 100) {
                        limit = USER_TRACK_NUM - i;
                    }

                    fetch(`https://api.spotify.com/v1/playlists/${ID}/tracks?fields=items(track(uri, album.images))&limit=${limit}&offset=${i}`, {
                            headers: {
                                'Authorization': 'Bearer ' + accessToken
                            }
                        })
                        .then(response => response.json())
                        //Apart from songs uris, we also create state 'img4' that stores links of covers of first 4 songs (in an array).
                        .then(data => this.setState(prevState => ({
                            uris: [...prevState.uris, data.items.map((id) => id.track.uri)],
                            img4: data.items.slice(0, 4).map((id) => id.track.album.images[1].url),
                        })))
                }
            }
        }
    }

    render() {
        let updateStep = this.props.updateStep;
        const USER_TRACK_NUM = this.props.userTrackNum;
        return (
            <div>
			{	
				//displaying error if user selected 0 or less songs in previous step
				USER_TRACK_NUM === 0 ?
				//by clicking error message: reload whole page, because when setting step state to '1' console starts to throw error "Can't perform a React state update on an unmounted component."
				<p id="creation-error" onClick={() => window.location.reload(true)}>
					Sorry, but you choose wrong number of songs in 
					<span style={{color: '#fff'}}> step 2</span>. 
					Click on this text to go back to playlist selection page.
				</p>
				:
				/*
				preview of pare down process: 
				- on left original playlist (with cover, title of it and num of songs)
				and between of these two are buttons: create(setting step to 4) and cancel(setting step to 1);
				- on right playlist after pare down (with cover, title of it and num songs)
				*/
				<div id="preview-box">
					<div id="preview-selected">
						<p className="preview-header">SELECTED PLAYLIST:</p>
						<img src={this.props.imageUrl} className="preview-selected-img" alt={this.props.playlistName} title={this.props.playlistName}/>
						
						<p className="preview-name">Name: <span style={{opacity: 0.5}}>{this.props.playlistName}</span></p>
						<p className="preview-num">Num of songs: <span style={{opacity: 0.5}}>{this.props.tracksNum}</span></p>
					</div>

					<div id="preview-btns">
						<div 
							id="preview-btn--create" 
							className="preview-btn" 
							onClick={() => updateStep({step: 4, uris: this.state.uris, playlistName: this.props.playlistName})}
						>
							Create
						</div>
						<div 
							id="preview-btn--cancel" 
							className="preview-btn" 
							onClick={() => window.location.reload(false)}
						>
							Cancel
						</div>
					</div>
					
					<div id="preview-pared">
						<p className="preview-header">AFTER PARE DOWN:</p>
						{
							this.state.img4 ?
								this.state.img4.length < 4 ?
								<img src={this.state.img4[0]} className="preview-pared-img--big" alt={this.props.playlistName + 'Pared Down'} title={this.props.playlistName + 'Pared Down'} />
								:
								<div id="preview-pared-img-box">
									<img src={this.state.img4[2]} className="preview-pared-img" alt={this.props.playlistName + 'Pared Down'} title={this.props.playlistName + 'Pared Down'} />
									<img src={this.state.img4[0]} className="preview-pared-img" alt={this.props.playlistName + 'Pared Down'} title={this.props.playlistName + 'Pared Down'} />
									<img src={this.state.img4[3]} className="preview-pared-img" alt={this.props.playlistName + 'Pared Down'} title={this.props.playlistName + 'Pared Down'} />
									<img src={this.state.img4[1]} className="preview-pared-img" alt={this.props.playlistName + 'Pared Down'} title={this.props.playlistName + 'Pared Down'} />
								</div>
							: null
						}
						<p className="preview-name">Name: <span style={{opacity: 0.5}}>{this.props.playlistName} - Pared Down</span></p>
						<p className="preview-num">Num of songs: <span style={{opacity: 0.5}}>{USER_TRACK_NUM}</span></p>
					</div>
				</div>
			}
			</div>
        )
    }
}