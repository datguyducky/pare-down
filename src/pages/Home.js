import React, { Component } from 'react';
import '../utils/reset.css';
import '../utils/colors.css';

import './styles/Home.css'

import { Header, Button } from '../components';


export default class Home extends Component {
	constructor() {
		super()
		this.state = {
			COVER_URL: require('../assets/cover1.jpg'),
			NAME_NUM: 0,
			STEP1: 0, STEP2: 1, STEP3: 2,
		}

		this.randomNumber = 0;
	}


	componentDidMount()  {
		this.generateRandomNumber(); // calls it the first time and the setInterval will keep running
		this.generateStep();
	}
	

	newRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min; 
	}
	

	generateRandomNumber() {
		setInterval(() => {
			//random number of songs (min 69, max 1420) in playlist. 
			//new number every 3sec
			const SONGS_NUM = this.newRandomNumber(69, 1420);
			document.getElementById('playlistSongs').innerHTML = 'Num. of songs: ' + SONGS_NUM;
			

			//every 3sec random cover art for playlist (1-5)
			this.setState({
				COVER_URL: require('../assets/cover'+ this.newRandomNumber(1, 5) +'.jpg'),
				NAME_NUM: this.newRandomNumber(0, 4)
			})


			//every 3sec random % number to pare down playlist by, then displaying new number of songs in pared down version of playlist
			const PARE_DOWN = this.newRandomNumber(32, 88);
			document.getElementById('playlistNewSongs').innerHTML = 'Num. of songs: ' + Math.floor(SONGS_NUM * (PARE_DOWN / 100));
		}, 3000)
	}


	generateStep() {
		setInterval(() => {
			//every ~1.5 sec we're displaying new values for last,current and next step
			//by using array for list of available steps, and then generating 1 random number
			//for next step
			const elm = document.getElementsByClassName('step');
			for(let i=0; i<elm.length; i++) {
				elm[i].style.webkitAnimation = 'none';
				setTimeout(function() {
					elm[i].style.webkitAnimation = '';
				}, 10);
			};
			
			this.setState({
				STEP1: this.state.STEP2,
				STEP2: this.state.STEP3,
				STEP3: this.newRandomNumber(1, 18) - 1,
			})
		}, 1490)
	}
	

    render() {
		const COVER_URL = this.state.COVER_URL;
		const NUM = this.state.NAME_NUM;
		const PLAYLIST_NAME = [
			'Workout',
			'Love <3',
			'Reading Time',
			'Sleep/Relax',
			'Night Rider'
		];
		const PD_PROGRESS = [
			"authentication received", 
			"calculating progress", 
			"copying songs", 
			"doing math for pare down", 
			"downloading playlist info", 
			"finishing pare down", 
			"getting cover art", 
			"getting new num. of songs", 
			"getting ready to pare down", 
			"hoping for the best", 
			"launching spacex satellite", 
			"looking at funny cat videos", 
			"new num. of songs received", 
			"new playlist name received", 
			"updating playlist name", 
			"waiting for authentication", 
			"waiting for connection", 
			"waiting for spotify"
		];
		const STEP1 = this.state.STEP1;
		const STEP2 = this.state.STEP2;
		const STEP3 = this.state.STEP3;


		return (
			<div className='app-wrapper'>
            	<Header/>
				<div className='app-content'>
					<div className='intro'>
						<h1 className='intro-h'>
							DUPLICATE YOUR PLAYLIST WITH REDUCED NUMBER OF SONGS
						</h1>
						<p className='intro-desc'>
							Create smaller copies of your playlists so you can use less data when downloading them to enjoy listening to music in offline mode.
						</p>

						<Button
							text = 'Pare Down'
							color = 'var(--text1)'
							bgColor = 'var(--brand)'
							href = '#'
							className = 'intro-btn'
						/>
					</div>

					<div className='preview'>
						<div className='preview-cards'>
							{
							<div className='preview-card-left'>
								<span className='playlist-num' id="playlistSongs">
									Num. of songs: 72
								</span>
								<img 
									className='playlist-img' 
									src={COVER_URL}
									alt='example playlist cover' 
								/>
								<span className='playlist-name' id="playlistName">
									{PLAYLIST_NAME[this.state.NAME_NUM]}
								</span>
							</div>
							}

							<div className='preview-card-text'>
								<p className='text-done step'>{PD_PROGRESS[STEP1]}</p>
								<p className='text-now step'>{PD_PROGRESS[STEP2]}</p>
								<p className='text-next step'>{PD_PROGRESS[STEP3]}</p>
							</div>

							{
							<div className='preview-card-right'>
								<span className='playlist-num' id="playlistNewSongs">
									Num of songs: 56
								</span>
								<img 
									className='playlist-img' 
									src={COVER_URL}
									alt='example playlist cover' 
								/>
								<span className='playlist-name' id="playlistName">
									Pared Down {PLAYLIST_NAME[NUM]}
								</span>
							</div>
							}

						</div>

						<div className='preview-platforms'>
							<p className='platform-text'>works with:</p>
							<div className='platform-wrapper'>
								<div className='platform' id='p-spotify'>
									<img src={require('../assets/spotify.png')} alt='Spotify logo'/>
								</div>
								<div className='platform' id='p-apple'>
									<img src={require('../assets/apple_music.png')} alt='Apple Music logo'/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
        );
    }
}