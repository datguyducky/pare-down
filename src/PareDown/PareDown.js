import React, {Component} from 'react';
import queryString from 'query-string';

import './PareDown.css';

import TracksCard from './TracksCard/TracksCard';


function step2Fetch() {
    let ID = this.props.id;
    //checking address bar for access token from Spotify API.
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    //sending proper request to Spotify API with sort state in consideration.
    if (this.state.sort === true) {
        /*
        for playlist sorted by: 'recently added' we send 2 requests to Spotify API: 
        1) to get name, image of playlist and most important - how many songs there're total in this playlist,
        2) to get list of tracks, using offset atribute in Spotify API: total num of songs in playlist - 100. We substract 100 from it, because that's the maximum number of songs we can get in one request and we want all songs from this playlist starting (by using offset) on song that is on position of: total num of songs - 100.

        We also check if there're less than 100 songs, if yes then we don't use offset attribute.
        */
        fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}?fields=name,images,tracks.total`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
                tracksNum: data.tracks.total,
                how: fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}/tracks?offset=${data.tracks.total>100 ? data.tracks.total-100 : 0}`, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                    .then(response => response.json())
                    .then(data => this.setState({
                        tracks: data.items,
                    }))
            }))
    } else if (this.state.sort === false) {
        //for whatever reason Spotify API playlist request returns songs that were first added to playlist, we use this behaviour only when sort state is set to false.
        fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
                tracksNum: data.tracks.total,
                tracks: data.tracks.items,
            }))
    } else if (!this.state.sort) {
        //on first render of component the sort state is not created yet. So we send request to Spotify API with tracks being sorted by recently added to playlist.
        fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}?fields=name,images,tracks.total`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => this.setState({
                name: data.name,
                imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
                tracksNum: data.tracks.total,
                how: fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}/tracks?offset=${data.tracks.total>100 ? data.tracks.total-100 : 0}`, {
                        headers: {
                            'Authorization': 'Bearer ' + accessToken
                        }
                    })
                    .then(response => response.json())
                    .then(data => this.setState({
                        tracks: data.items,
                    }))
            }))
        //setting new sort state, so on first sort-button click we'll get tracks sorted by: 'being first' added to playlist
        this.setState({
            sort: false
        })
    }
}

export default class PareDown extends Component {
    componentDidMount() {
        step2Fetch();
    }

    componentWillUnmount() {
        console.log('a');
    }

    constructor() {
        super();
        this.state = {
            inputValue: 0,
        }
        step2Fetch = step2Fetch.bind(this);
        changeSort = changeSort.bind(this);
    }

    render() {
        let updateStep = this.props.updateStep;
        return (
            <div id="paredown">
				<div id="paredown__left">
					<div id="paredown__details">
						{/* name of playlist and cover of it */}
						<img src={this.state.imageUrl} style={{width: '120px', height:'120px'}} alt={this.state.name} title={this.state.name}/>
						<h1>{this.state.name}</h1>
					</div>
					<div className="paredown__playlist">
						<p style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>
							{
								this.state.tracksNum <= 100 ?
								<span>{this.state.tracksNum} latest songs from selected playlist:</span>
								:
								<span>100 latest songs from selected playlist:</span>
							}
							
						</p>
						{/* 
						mapping tracks array, and reversing order of items inside it - if sort state is set to false.
						If we wouldn't reverse them, tracks that are sorted by: 'recently added' are in wrong order.
						*/}
						{	
						this.state.tracks ?
							this.state.sort === true ?
								this.state.tracks.map((track, i) => 
								<TracksCard track={track.track} key={i} num={i} iValue={this.state.inputValue}/>)
							:
								this.state.tracks.reverse().map((track, i) => 
								<TracksCard track={track.track} key={i} num={i} iValue={this.state.inputValue}/>)
						:
						<p>Sorry, couldn't find any songs in selected playlist. </p>
						}
					</div>
				</div>
				<div id="paredown__right">
					<form>
						<p className="options__header">Pare it down to/by...</p>
							<div style={{textAlign:'center'}}>
								{/* input to type how many songs we want to get from original playlist, needed in step 3 */}
								<input type="number" min="0" id="new-num" onChange={evt => this.updateInputValue(evt, this.state.tracksNum)}/>
								{/* we can also toggle percents to select how many songs we want to get */}
								<input type="checkbox" id="percent--btn" />
							</div>
							{/* displaying (under input) how many songs there will be in new playlist after pare down */}
							<p id="new-num__show">New playlist will have: {this.state.inputValue} songs.</p>
						
						<p className="options__header" style={{marginTop: 21}}>
							{/* option to sort songs by: 'recently added' OR 'first added to playlist" */}
							Add songs from selected playlist sorted by: 
							<input type="checkbox" id="sort--btn" onClick={() => changeSort()}/>
						</p>

						{/* button to pass all needed states, used by another component in step 3 - where pare down process is done behind scenes and result is displayed for user */}
						{<div id="create--btn" onClick={() => updateStep({step: 3, id: this.props.id, sort: this.state.sort, userTrackNum: this.state.inputValue, playlistName: this.state.name, imageUrl: this.state.imageUrl, tracksNum: this.state.tracksNum})}>Create new playlist</div>}
					</form>
				</div>
			</div>
        )
    }

    //function to set state with input value typed by user
    updateInputValue(evt, max) {
        const PERCENT = document.getElementById('percent--btn');
        //console.log(max);

        //checking if button for percents was clicked by user.
        if (!PERCENT.checked) {
            //if typed number by user is smaller than total number of songs in playlist, set state by using user input. If not set it to total number of songs in playlist
            if (evt.target.value <= max) {
                this.setState({
                    inputValue: evt.target.value
                });
            } else {
                this.setState({
                    inputValue: max
                });
            }

        } else {
            //same as above but with percents
            if (evt.target.value <= 100) {
                this.setState({
                    inputValue: ((max * evt.target.value) / 100).toFixed(0)
                });
            } else {
                this.setState({
                    inputValue: max
                });
            }
        }
    }
}

function changeSort() {
    //used by sort-button, to change which tracks are displayed by TracksCard component (recently added to playlist or the ones that were first added to playlist)
    this.setState({
        sort: !this.state.sort
    });
    //calling fetch function again, so proper request can be send to Spotify API to get tracks properly sorted by
    step2Fetch();
}