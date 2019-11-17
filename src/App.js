import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

//importing components that are used in every step
import Header from './Header/Header';
import Step from './Steps/Steps';
import Footer from './Footer/Footer';

//importing components that are only used for specific step.
import PlaylistsCards from './PlaylistsCards/PlaylistsCards';
import PareDown from './PareDown/PareDown';
import ResultPreview from './ResultPreview/ResultPreview';
import Result from './Result/Result';

//Media queries for responsive design
import './Responsive/Responsive.css';

export default class App extends Component {
	//function to update specific state
    updateStep({step, id, sort, userTrackNum, playlistName, imageUrl, tracksNum, uris} = {}) {
        this.setState({
            step,
            id,
            sort,
            userTrackNum,
            playlistName,
            imageUrl,
            tracksNum,
            uris
        });
    }

    constructor() {
        super();
        this.state = {
            filterString: '',
        }
        this.updateStep = this.updateStep.bind(this);
    }

    //send request to Spotify API to get all playlists that are public and private and display them in step 1
    componentDidMount() {
        //checking address bar for access token from Spotify API.
        let parsed = queryString.parse(window.location.search);
        let accessToken = parsed.access_token;
        if (!accessToken)
            return;

        //getting user id, used by other requests to Spotify API
        fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => this.setState({
                userID: data.id
            }))

        fetch(`https://api.spotify.com/v1/me/playlists`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            //setting playlists state with response that is an array of playlists, and setting step state to 1
            .then(data => this.setState({
                playlists: data.items.map(item => {
                    if (item.images.length === 0) {
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
        let playlistToRender =
            this.state.playlists ?
            this.state.playlists.filter(playlist =>
                playlist.name.toLowerCase().includes(
                    this.state.filterString.toLowerCase()),
			) 
			: []

        return (
            <div className="App">
				{/* Header + sub-header and below that current step (number + description) */}
				<Header/>
				<Step step={this.state.step}/>
				
				{
				
				//component for step1: displaying all playlists for this user
				this.state.playlists && this.state.step === 1 ? 
					<div className="playlist-grid">
						{	
						playlistToRender.map((playlist, i) => 
						<PlaylistsCards 
							playlist={playlist} 
							step={this.state.step} 
							key={i} 
							userID={this.state.userID} 
							updateStep={this.updateStep}
						/>
						)}
					</div>
				:
				//component for step2: displaying 100 songs that were first added to playlist that user selected in step1 or 100 songs that were added recently + section to personalize pared down version of playlist
				this.state.playlists && this.state.step === 2 ?
					<PareDown 
						id={this.state.id} 
						userID={this.state.userID} 
						updateStep={this.updateStep}
					/>
				:
				//component for step3: on left there's playlist that was selected on step1, on right there's pared down version of that playlist. Between these to there're buttons to create or cancel creation of pared down version of that playlist
				this.state.playlists && this.state.step === 3 ?
					<ResultPreview 
						id={this.state.id}
						sort={this.state.sort} 
						userTrackNum={this.state.userTrackNum} 
						userID={this.state.userID} 
						playlistName={this.state.playlistName}
						imageUrl={this.state.imageUrl}
						tracksNum={this.state.tracksNum}
						updateStep={this.updateStep}
					/>
				:
				//component for step4: information about succesful creation of pared down playlist and button to go back to step1
				this.state.playlists && this.state.step === 4 ?
					<Result 
						uris={this.state.uris} 
						userID={this.state.userID} 
						playlistName={this.state.playlistName}
					/>
				:
				//button to log in with Spotify - if user logged in then displaying step1 component
				<div className="btn" onClick={() => {
					window.location = window.location.href.includes('localhost') 
					? 'http://localhost:8888/login' 
					: 'http://pare-down-backend.mtymon.me/login' 
					this.setState({step: 1})
				}}>log in with spotify</div>
	
				}

				{/* link to Github profile */}
				<Footer />
			</div>
        );
    }
}