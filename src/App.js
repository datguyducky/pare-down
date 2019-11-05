import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

//function to change current step
function updateStep({step, id, sort, userTrackNum, playlistName, imageUrl, tracksNum, uris}={}) {
	//console.log(arguments);
	this.setState({ step, id, sort, userTrackNum, playlistName, imageUrl, tracksNum, uris})
}

//main component of pare down
class App extends Component {
	constructor() {
		super();
		this.state = {
		  filterString: '',
		}
		updateStep = updateStep.bind(this)
	}

	//send request to Spotify API to get all playlists that are public or private and display them in step 1
	componentDidMount() {
		//checking address bar for access token from Spotify API.
		let parsed = queryString.parse(window.location.search);
		let accessToken = parsed.access_token;
		if (!accessToken)
		return;

		//getting user id, used by other requests to Spotify API
		fetch('https://api.spotify.com/v1/me', {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({userID: data.id}))
		
		fetch(`https://api.spotify.com/v1/me/playlists`, {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		//setting playlists state with response that is an array of playlists, and setting step state to 1
		.then(data => this.setState({
			playlists: data.items.map(item => {
				if(item.images.length === 0){
					item.images.push('')
				}
				return {
					name: item.name,
					imageUrl: item.images[0].url, 
					songsNum: item.tracks.total,
					id: item.id
				}
			}),
			step: 1
		}))
	}


	render() {
		//function to map all playlists, then creating for every of one of them playlist-card that shows name, total number of songs in playlist and name of it.
		//console.log(this.state)
		let playlistToRender = 
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
			
				{/* displaying current step and text for it on top of site and proper component for this step */ }
				{/* 
				if access token wasn't find - show button to login with Spotify, and on backend we use auth, where user grant pare down permission to access and/or modify the user’s own data - in this case: 
				- Read and modify user private playlists.
				- Read and modify user public playlists.
				*/}
				<Step step={this.state.step}/>
				{

				this.state.playlists && this.state.step === 1 ? 
					<div className="playlist-grid">
						{	
							playlistToRender.map((playlist, i) => 
							<PlaylistCards playlist={playlist} step={this.state.step} key={i} userID={this.state.userID}/>
						)}
					</div>
				:
				this.state.playlists && this.state.step === 2 ?
					<PareDown id={this.state.id} userID={this.state.userID}/>
				:
				this.state.playlists && this.state.step === 3 ?
					<ResultsPreview id={this.state.id}
						sort={this.state.sort} 
						userTrackNum={this.state.userTrackNum} 
						userID={this.state.userID} 
						playlistName={this.state.playlistName}
						imageUrl={this.state.imageUrl}
						tracksNum={this.state.tracksNum}
					/>
				:
				this.state.playlists && this.state.step === 4 ?
					<Results uris={this.state.uris} userID={this.state.userID} playlistName={this.state.playlistName}></Results>
				:
				<div className="btn" onClick={() => {
					window.location = window.location.href.includes('localhost') 
					? 'http://localhost:8888/login' 
					: 'http://pare-down-backend.mtymon.me/login' 
					this.setState({step: 1})
				}}>log in with spotify</div>
	
				}
				<Footer />
			</div>
		);
	}
}

//component to display proper message for current state
class Step extends Component {
	render() {
		if(this.props.step === 1){
			return(
				<h3 className="step--header">{this.props.step}. Select which playlist you would like to pare down: </h3>
			)
		}
		else if (this.props.step === 2) {
			return(
				<h3 className="step--header">{this.props.step}. Personalize playlist that will be created by pare down process: </h3>
			)
		}
		else if (this.props.step === 3) {
			return(
				<h3 className="step--header">{this.props.step}. Preview your pare down process: </h3>
			)
		}
		else {
			return null;
		}
	}
}

//component used in step 1, displaying name, cover and total number of songs in all of playlists of current 'logged-in' user.
class PlaylistCards extends Component {
	render() {
		let playlist = this.props.playlist
		//after user click on one of his playlists we set state with selected playlist id, and set step state to 2
		return (
			<div className="playlist" onClick={() => updateStep({step: 2, id: this.props.playlist.id})}>
				<p className="playlist__song-count">Number of songs: {playlist.songsNum}</p>
				<div className="playlist__cover">
					<img src={playlist.imageUrl} className="playlist__cover--img" alt={playlist.name} title={playlist.name}/>
				</div>
				<p className="playlist__name">{playlist.name}</p>
		 	 </div>
		);
	  }
}

//main component for step 2
class PareDown extends Component {
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
		step2Fetch =  step2Fetch.bind(this);
		changeSort = changeSort.bind(this);
	}

	render() {
		console.log(this.state)
		return(
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
								<TrackCard track={track.track} key={i} num={i} iValue={this.state.inputValue}/>)
							:
								this.state.tracks.reverse().map((track, i) => 
								<TrackCard track={track.track} key={i} num={i} iValue={this.state.inputValue}/>)
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
						<div id="create--btn" onClick={() => updateStep({step: 3, id: this.props.id, sort: this.state.sort, userTrackNum: this.state.inputValue, playlistName: this.state.name, imageUrl: this.state.imageUrl, tracksNum: this.state.tracksNum})}>Create new playlist</div>
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
		if(!PERCENT.checked) {
			//if typed number by user is smaller than total number of songs in playlist, set state by using user input. If not set it to total number of songs in playlist
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
			//same as above but with percents
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

//TrackCard component, used in step 2
class TrackCard extends Component {
	//without this, component re-renders itself on input value change (after sort-button was clicked)
	//so don't delete it :)
	shouldComponentUpdate(nextProps) {
		if(this.props.iValue !== nextProps.iValue) {
			 return false
		}
		return true
	}
	   
	render () {
		return (
			<div>
				{/* Track Number (1-100) : Track Title*/}
				<p>{this.props.num + 1}. <span style={{opacity: '0.6'}}>{this.props.track.name}.</span></p>
			</div>
		)
	}
}

//function with request to Spotify API, only used on step 2.
function step2Fetch() {
	let ID = this.props.id;
	//checking address bar for access token from Spotify API.
	let parsed = queryString.parse(window.location.search);
	let accessToken = parsed.access_token;

	//sending proper request to Spotify API with sort state in consideration.
	if(this.state.sort === true) {
		/*
		for playlist sorted by: 'recently added' we send 2 requests to Spotify API: 
		1) to get name, image of playlist and most important - how many songs there're total in this playlist,
		2) to get list of tracks, using offset atribute in Spotify API: total num of songs in playlist - 100. We substract 100 from it, because that's the maximum number of songs we can get in one request and we want all songs from this playlist starting (by using offset) on song that is on position of: total num of songs - 100.

		We also check if there're less than 100 songs, if yes then we don't use offset attribute.
		*/
		fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}?fields=name,images,tracks.total`, {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
			tracksNum: data.tracks.total,
			how: fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}/tracks?offset=${data.tracks.total>100 ? data.tracks.total-100 : 0}`, {
			headers: {'Authorization': 'Bearer ' + accessToken}
			})
			.then(response => response.json())
			.then(data => this.setState({
				tracks: data.items,
			}))
		}))
	}else if (this.state.sort === false) {
		//for whatever reason Spotify API playlist request returns songs that were first added to playlist, we use this behaviour only when sort state is set to false.
		fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}`, {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
			tracksNum: data.tracks.total,
			tracks: data.tracks.items,
		}))
	}else if(!this.state.sort) {
		//on first render of component the sort state is not created yet. So we send request to Spotify API with tracks being sorted by recently added to playlist.
		fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}?fields=name,images,tracks.total`, {
		headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		.then(data => this.setState({
			name: data.name,
			imageUrl: data.images.length === 0 ? data.images.push('') : data.images[0].url,
			tracksNum: data.tracks.total,
			how: 
				fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists/${ID}/tracks?offset=${data.tracks.total>100 ? data.tracks.total-100 : 0}`, {
				headers: {'Authorization': 'Bearer ' + accessToken}
				})
				.then(response => response.json())
				.then(data => this.setState({
					tracks: data.items,
				}))	
			}))
		//setting new sort state, so on first sort-button click we'll get tracks sorted by: 'being first' added to playlist
		this.setState({sort: false})
	}
}

function changeSort() {
	//used by sort-button, to change which tracks are displayed by TracksCard component (recently added to playlist or the ones that were first added to playlist)
	this.setState({sort: !this.state.sort});
	//calling fetch function again, so proper request can be send to Spotify API to get tracks properly sorted by
	step2Fetch();
}

//component used in step 3: preview of pare down process.
class ResultsPreview extends Component {
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
		if(USER_TRACK_NUM > 0){
			if(this.props.sort === false) {
				for(let i=0; i<USER_TRACK_NUM; i+=100){
					let limit = 100;
					let offset = this.props.tracksNum - (i + 100);
					if(USER_TRACK_NUM-i < 100) {
						limit = USER_TRACK_NUM-i;
						offset = this.props.tracksNum - i - limit;
					}
					
					fetch(`https://api.spotify.com/v1/playlists/${ID}/tracks?fields=items(track(uri, album.images))&limit=${limit}&offset=${offset}`, {
					headers: {'Authorization': 'Bearer ' + accessToken}
					})
					.then(response => response.json())
					//Apart from songs uris, we also create state 'img4' that stores links of covers of first 4 songs (in an array).
					.then(data => this.setState(prevState => ({
						uris: [...prevState.uris, data.items.reverse().map((id) => id.track.uri)],
						img4: data.items.slice(0, 4).map((id) => id.track.album.images[1].url),
					})))
				}
			}
			else if(this.props.sort === true) {
				for(let i=0; i<USER_TRACK_NUM; i+=100){
					let limit = 100
					if(USER_TRACK_NUM-i < 100) {
						limit = USER_TRACK_NUM-i;
					}
					
					fetch(`https://api.spotify.com/v1/playlists/${ID}/tracks?fields=items(track(uri, album.images))&limit=${limit}&offset=${i}`, {
					headers: {'Authorization': 'Bearer ' + accessToken}
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
		console.log(this.state)
		const USER_TRACK_NUM = this.props.userTrackNum;
		return (
			<div>
			{	
				//displaying error if user selected 0 or less songs in previous step
				USER_TRACK_NUM === 0 ?
				//by clicking error message: reload whole page, because when setting step state to '1' console starts to throw error "Can't perform a React state update on an unmounted component."
				<p id="creation-error"onClick={() => window.location.reload()}>Sorry, but you choose wrong number of songs in <span style={{color: '#fff'}}>step 2</span>. Click on this text to go back to playlist selection page.</p>
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
						<div id="preview-btn--create" className="preview-btn" onClick={() => updateStep({step: 4, uris: this.state.uris, playlistName: this.props.playlistName})}>Create</div>
						<div id="preview-btn--cancel" className="preview-btn" onClick={() => updateStep({step: 1})}>Cancel</div>
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

class Results extends Component {
	constructor() {
		super();
		this.state = {
			success: null
		}
	}
	
	componentDidMount() {
		let uris = this.props.uris;
		//checking address bar for access token from Spotify API.
		let parsed = queryString.parse(window.location.search);
		let accessToken = parsed.access_token;
		if (!accessToken)
		return;
		//creating new playlist
		fetch(`https://api.spotify.com/v1/users/${this.props.userID}/playlists`, {
			method: 'POST',
			body: JSON.stringify({
				"name": this.props.playlistName + ' - Pared Down',
			}),
			headers: {'Authorization': 'Bearer ' + accessToken}
		})
		.then(response => response.json())
		//adding "selected" songs by user to this freshly created playlist. 
		//Spotify API allow only to add max 100 songs per request. 'uris' state stores X ammount of arrays inside it - by looping it we can send proper ammount of requests to add all songs that we need.
		.then((data) => {
			for(let i=0; i<uris.length; i++){
				fetch(`https://api.spotify.com/v1/playlists/${data.id}/tracks`, {
				method: 'POST',
				body: JSON.stringify({
					"uris": this.props.uris[i]
				}),
				headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json'}
				})
				.then((response) => {
					if(response.status === 201){
						this.setState({
							success: 'Playlist was created!'
						})
					}
				})
			}
		})
	}
	render() {
		return (
			this.state.success ? 
			<div>
				<p className="step--header">{this.state.success}</p>
				{
				/*btn to pare down another playlist. We reload whole page, because when we try to set step state to '1' console throws error about "Can't perform a React state update on an unmounted component."*/
				}
				<div onClick={() => window.location.reload()} className="btn" style={{backgroundColor: '#333', marginTop: 0, maxWidth: 270}}>Pare down another playlist</div>
			</div>
			: null
		)
	}
}

class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<p>
					<span>Copyright &copy; {new Date().getFullYear()} || </span>
					<a href="https://github.com/datguysheepy/pare-down"> Github: datguysheepy</a>
				</p>
			</div>
		)
	}
}

export default App;