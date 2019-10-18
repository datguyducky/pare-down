import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';


class TrackCard extends Component {
	shouldComponentUpdate(nextProps) {
		if (this.props.track !== nextProps.track) {
			return false;
		} else {
			return true;
		}
	}
	render () {
		//console.log(this.props.track.name)
		return (
			<div>
				<p>{this.props.num + 1}. <span style={{opacity: '0.6'}}>{this.props.track.name}.</span></p>
			</div>
		)
	}
}

class PareDown extends Component {
	componentDidMount() {
		//console.log(this.props.id)
		let ID = this.props.id;
		let parsed = queryString.parse(window.location.search);
		let accessToken = parsed.access_token;
		fetch(`https://api.spotify.com/v1/users/***REMOVED***/playlists/${ID}?fields=name,images,tracks.total`, {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			imageUrl: data.images[0].url,
			tracksNum: data.tracks.total,
			how: fetch(`https://api.spotify.com/v1/users/***REMOVED***/playlists/${ID}/tracks?offset=${data.tracks.total>100 ? data.tracks.total-100 : 0}`, {
			headers: {'Authorization': 'Bearer ' + accessToken}
				})
				.then(response => response.json())
				.then(data => this.setState({
					tracks: data.items,
				}))
		}))
	}

	constructor() {
		super();
		this.state = {
			reverse: true,
			inputValue: 0,
			sort: true,
		}
	}

	render() {
		console.log(this.state)
		return(
			<div id="paredown">
				<div id="paredown__left">
					<div id="paredown__details">
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
					{	
						this.state.tracks ?
							this.state.reverse === true ?
								this.state.tracks.reverse().map((track, i) => 
								<TrackCard track={track.track} key={i} num={i}/>)
							:
							this.state.tracks.map((track, i) => 
							<TrackCard track={track.track} key={i} num={i}/>)
						:
						<p>Nope</p>
					}
					</div>
				</div>
				<div id="paredown__right">
					<form>
						<p className="options__header">Pare it down to/by...</p>
							<div style={{textAlign:'center'}}>
								<input type="number" min="0" id="new-num" onChange={evt => this.updateInputValue(evt, this.state.tracksNum)}/>
								<input type="checkbox" id="percent--btn" />
							</div>
							<p id="new-num__show">New playlist will have: {this.state.inputValue} songs.</p>
						
						<p className="options__header" style={{marginTop: 21}}>
							Add songs from selected playlist sorted by: 
							<input type="checkbox" id="sort--btn" onClick={() => this.setState({sort: true ? false : true})}/>
						</p>
						<div id="create--btn" onClick={() => updateStep(3, this.props.id, this.state.sort, this.state.inputValue)}>Create new playlist</div>
					</form>
				</div>
			</div>
		)
	}
	updateInputValue(evt, max) {
		const PERCENT = document.getElementById('percent--btn');
		console.log(max);
		if(!PERCENT.checked) {
			if(evt.target.value <= max) {
				this.setState({
					inputValue: evt.target.value
				});
			} else {
				this.setState({
					inputValue: max
				});
			}
			
		} else {
			if(evt.target.value <= 100){
				this.setState({
					inputValue: ((max * evt.target.value)/100).toFixed(0)
				});
			} else {
				this.setState({
					inputValue: max
				});
			}
		}
	}
}

class Step extends Component {
	render() {
		if(this.props.step === 1){
			return(
				<h3 className="step--header">{this.props.step}. Select which playlist you would like to pare down: </h3>
			)
		}
		else if (this.props.step === 2) {
			return(
				<h3 className="step--header">{this.props.step}. Check if this is the playlist you want to pare down (if not refresh page) and select options for paring it down. </h3>
			)
		}
		else if (this.props.step === 3) {
			return(
				<h3 className="step--header">{this.props.step}. wow, it's working </h3>
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

function updateStep(step, id, check, songNum) {
	console.log(arguments);
	this.setState({ step, id, check, songNum })
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
					<PareDown id={this.state.id}/>
				:
				this.state.user && this.state.step === 3 ?
					<p>{console.log(this.state)}</p>
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