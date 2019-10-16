import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

class Step extends Component {
	render() {
		if(this.props.step === 1){
			return(
				<h3 className="step--header">{this.props.step}. Select which playlist you would like to pare down: </h3>
			)
		}
		else if (this.props.step === 2) {
			return(
				<p>{this.props.step}</p>
			)
		}
		else {
			return null;
		}
	}
}

class PlaylistCards extends Component {
	render() {
		let playlist = this.props.playlist
		return (
		  <div className="playlist" onClick={() => updateStep(2, this.props.playlist.id)}>
			<p className="playlist__song-count">Number of songs: {playlist.songsNum}</p>
			<div className="playlist__cover">
				<img src={playlist.imageUrl} style={{width: '210px', height:'210px'}} alt={playlist.name} title={playlist.name}/>
			</div>
			<p className="playlist__name">{playlist.name}</p>
		  </div>
		);
	  }
}

function updateStep(step, id) {
	this.setState({ step, id })
}

class App extends Component {
	constructor() {
		super();
		this.state = {
		  filterString: '',
		}
		updateStep = updateStep.bind(this)
	}

	componentDidMount() {
		let parsed = queryString.parse(window.location.search);
		let accessToken = parsed.access_token;
		if (!accessToken)
		return;
		fetch('https://api.spotify.com/v1/me', {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
		user: {
			name: data.display_name,
		},
		step: 1
		}))
	
		fetch('https://api.spotify.com/v1/me/playlists', {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
			playlists: data.items.map(item => {
				return {
					name: item.name,
					imageUrl: item.images[0].url, 
					songsNum: item.tracks.total,
					id: item.id
				}
			})
		}))
	}


	render() {
		console.log(this.state.id)
		let playlistToRender = 
		this.state.user && 
		this.state.playlists 
		  ? this.state.playlists.filter(playlist => 
			playlist.name.toLowerCase().includes(
			  this.state.filterString.toLowerCase()),
			  )
		  : []
		return (
			<div className="App">
				<h1 className="app-name">Pare Down for Spotify</h1>
				<h2 className="app-name__sub">Create copy of your playlist pared down to number of songs you have chosen to.</h2>
				
				<Step step={this.state.step}/>
				{
				this.state.user && this.state.step === 1 ? 
					<div className="playlist-grid">
						{	
							playlistToRender.map((playlist, i) => 
							<PlaylistCards playlist={playlist} step={this.state.step} key={i}/>
						)}
					</div>
				:
				this.state.user && this.state.step === 2 ?
					<p>abc</p>
				:
				<div className="btn" onClick={() => {
					window.location = window.location.href.includes('localhost') 
					? 'http://localhost:8888/login' 
					: 'https://better-playlists-backend.herokuapp.com/login' 
					this.setState({step: 1})
				}
					
				}>login in with spotify</div>
				}
			</div>
		);
	}
}

export default App;