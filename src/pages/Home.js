import React, { Component } from 'react';
import { Header, Button, FAQ, Footer } from '../components';
import { Copy, Calendar, Cloud, GitPullRequest } from 'react-feather';

import '../utils/reset.css';
import '../utils/colors.css';

import './Home.css'


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

			const preview_l = document.getElementsByClassName('preview-card-left')[0];
			const preview_r = document.getElementsByClassName('preview-card-right')[0];
			preview_l.style.webkitAnimation = 'none';
			preview_r.style.webkitAnimation = 'none';
			setTimeout(function() {
				preview_l.style.webkitAnimation = '';
				preview_r.style.webkitAnimation = '';
			}, 10);
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
			});
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
		<div id='app-wrapper'>
			<div className='hero-wrapper'>
				
				<Header/>
				
				<div className="intro-wrapper">
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

				<div className='preview-wrapper'>
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

					<div className='preview-card-text'>
						<p className='text-done step'>{PD_PROGRESS[STEP1]}</p>
						<p className='text-now step'>{PD_PROGRESS[STEP2]}</p>
						<p className='text-next step'>{PD_PROGRESS[STEP3]}</p>
					</div>

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
				</div>

				<div className='platforms-wrapper'>
					<p className='platform-text'>
						works with:
					</p>

					<div style={{display: 'flex'}}>
						<div className='platform' id='p-spotify'>
							<img src={require('../assets/spotify.png')} alt='Spotify logo'/>
						</div>
						
						<div className='platform' id='p-apple'>
							<img src={require('../assets/apple_music.png')} alt='Apple Music logo'/>
						</div>
					</div>
				</div>

				<div className='hero-svg'><img src={require('../assets/wave.svg')} alt=''/></div>
			</div>

			<div className='sections-wrapper'>
				<section id='pricing'>
					<div className='pricing-svg'/>
						
					<h1>Free and secure</h1>
						<ul>
								<li>
									PareDown offers only one plan - which is completely free to use and have access to all features.
								</li>
								<li>
									Nobody likes ads and because of that we don't display them here.
								</li>
								<li>
									Fully open-source. You can go and check by yourself how PareDown works behind the scenes.
								</li>
								<li>
									PareDown does not collect or store any user data.*
								</li>
							</ul>

							<p>
								* May not apply to any of the music platforms used within PareDown. With any doubts regarding the processing of user data by these services, please refer to their respective Terms and Conditions of Use documents.
							</p>
				</section>

					<section id='features'>
						<h1>Features</h1>
						<div className='f-wrapper'>
							<div className='f-card'>
								<h2>
									<Copy className='f-card-i' size={34}/>
									Duplicate playlists
								</h2>
								<p>
									Create smaller copies of your playlists quickly and easily, reduced to a certain number of songs.
								</p>
							</div>
							<div className='f-card'>
								<h2>
									<Calendar className='f-card-i' size={34}/>
									<span>
										<span className='f-card-t'>NEW</span>
										Calendar
									</span>
								</h2>
								<p>
									A place where you can check the premiers of the songs of your favorite artists.
								</p>
							</div>
							<div className='f-card'>
								<h2>
									<Cloud className='f-card-i' size={34}/>
									Popular platforms
								</h2>
								<p>
								PareDown supports two most popular music streaming platforms (Apple Music & Spotify).
								</p>
							</div>
							<div className='f-card'>
								<h2>
									<GitPullRequest className='f-card-i' size={34}/>
									Actively developed
								</h2>
								<p>
									You can expect even more exciting features in the future.
								</p>
							</div>
						</div>
					</section>

					<section id='faq' key=''>
						<div className='faq-overlay'>
							<div className='faq-overlay-img'/>
						</div>
						
							<h1>FAQ</h1>
								<FAQ 
									Q='Is there really only a free plan with no hidden payments? '
									A="Yes. By clicking 'Pare Down' or 'Go to the App' button you gain access to all the features that PareDown currently supports."
									id={0}
								/>
								<FAQ 
									Q='Are there any plans to add a paid version of PareDown?'
									A="No. PareDown is completely free and that's how it will stay. Also it is a fully open source project, so you can go and host your own version of it for free."
									id={1}
								/>
								<FAQ 
									Q='Name, description and cover for the pared down playlist - Can I choose them?'
									A='At this time, these features are not supported by PareDown.'
									id={2}
								/>
								<FAQ 
									Q='I want to pare down playlist from X music platform? Is it supported?'
									A='PareDown currently supports Spotify and Apple Music, but other music platforms will be added over time (if possible).'
									id={3}
								/>
								<FAQ 
									Q='Is there an option to pare down several playlists at once?'
									A='This is one of the features that I would like to add in the future to PareDown.'
									id={4}
								/>
								<FAQ 
									Q='It says that PareDown is currently unavailable, why?'
									A='This is due to the temporary unavailability of one of the music platforms that are used by PareDown.'
									id={5}
								/>
								<FAQ 
									Q='I think I found a bug, where can I report it?'
									A='You can submit it in github PareDown repository. Please choose appropriate title and description.'
									id={6}
								/>
								<FAQ 
									Q='I have this great idea for PareDown, where can I submit it?'
									A='You can submit it in github PareDown repository. Please choose appropriate title and description.'
									id={7}
								/>
								<FAQ 
									Q='What user data is collected, accessed and saved by PareDown?'
									A="For PareDown to work fully, you need to grant it access to one of the supported platforms. By doing that the application now have access to the following data: manage your public playlis, manage and view your private playlists, view your profile. This is the only data that is accesed by PareDown and is NOT saved or collected for later use."
									id={8}
								/>
					</section>
			</div>
		</div>
        );
    }
}