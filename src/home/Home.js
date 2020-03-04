import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import FaqCard from './FaqCard';
import { Button, PlatformIcon } from '../components';
import { Copy, Calendar, Cloud, GitPullRequest } from 'react-feather';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

import pricing_svg from '../assets/circuit-board.svg';
import faq_svg from '../assets/bubbles.svg';

import '../utils/reset.css';
import '../utils/colors.css';

const spotify = require('../assets/spotify.png');
const apple_music = require('../assets/apple_music.png');


/* styling */
const GlobalStyle = createGlobalStyle`
 	body {
		font-family: Source Sans Pro, sans-serif;
	}
`		
const HeroWrapper = styled.div`
	background-color: #2c2e3e;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: var(--text1);
	position: relative;
	padding-bottom: 240px;

	@media (max-width: 920px) {
		padding: 0 32px;
		padding-bottom: 120px;
	}
`
const IntroWrapper = styled.div`
	padding: 82px 0 116px 0;
	width: 720px;
	display: flex;
	flex-direction: column;
	align-items: center;
	z-index: 20;

	@media (max-width: 760px) {
		width: 92%;
	}

	@media (max-width: 460px) {
		padding: 41px 0 58px 0;
	}

	& > a {
		@media (max-width: 460px) {
			width: 100%;
		}
	}
` 
const IntroHeader = styled.h1`
	margin: 0 auto;
	font-size: 32px;
	text-align: center;
	font-weight: 600;
	line-height: 1.1em;
	letter-spacing: 0.3px;

	@media (max-width: 460px) {
		font-size: 24px;
	}
`
const IntroDesc = styled.p`
	margin: 0 auto;
	margin-top: 10px;
	margin-bottom: 32px;
	font-size: 18px;
	text-align: center;
	color: var(--text2);

	@media (max-width: 460px) {
		font-size: 17px;
		line-height: 1.1em;	
	}
`
const SizeUp = keyframes`
	from {
		transform: scale(1.1);
	}

	to {
		transform: scale(1.0);
	}
`
const PreviewWrapper = styled.div`
	display: flex;
	width: 720px;
	justify-content: center;
	z-index: 20;

	& > #preview-left, #preview-right{
		text-align: center;
		animation: ${SizeUp} 1.5s;
		width: 156px;
	}

	@media (max-width: 760px) {
		width: 92%;
		flex-direction: column;
		align-items: center;
	}
`
const PlaylistNum = styled.span`
	font-size: 12px;
	font-weight: 600;
`
const PlaylistImg = styled.img`
	height: 156px;
	width: 156px;
	border-radius: 4px;
	margin-top: 8px;
	box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.24);
` 
const PlaylistName = styled.span`
	display: block;
	margin: 0 auto;
	margin-top: 6px;
	font-size: 18px;
	width: 80%;
`
const DoneMove = keyframes`
	from {
		transform: translateY(60%);
	}

	to {
		transform: translateY(0);
	}
`
const NextMove = keyframes`
	from {
		transform: translateY(-210%);
	}

	to {
		transform: translateY(0);
	}
`
const NowMove = keyframes`
	from {
		transform: translateY(120%);
	}

	to {
		transform: translateY(0);
	}
`
const PreviewTextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	text-transform: uppercase;
	font-weight: 700;
	color: var(--text2);
	text-align: center;
	margin: auto;

	& > .text-done, .text-next {
		font-size: 16px;
		opacity: 0.72;
		letter-spacing: 1.1px;

		@media (max-width: 460px) {
			font-size: 14px;
		}
	}

	& > .text-done {
		animation: 0.5s ease-out 0s 1 ${DoneMove};
	}

	& > .text-next {
		animation: 0.5s ease-out 0s 1 ${NextMove};
	}

	& > .text-now {
		font-size: 24px;
		margin: 2px 0;
		color: var(--text1);
		letter-spacing: 1.1px;
		animation: 0.5s ease-out 0s 1 ${NowMove};

		@media (max-width: 460px) {
			font-size: 21px;
		}
	}

	@media (max-width: 760px) {
		margin: 42px 0;
	}
`
const PlatformsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 42px;
	z-index: 20;
`
const PlatformsText = styled.p`
	font-size: 15px;
	font-weight: 600;
	letter-spacing: 0.15px;
	color: #fafaff;
	text-transform: uppercase;
	margin-bottom: 8px;

	@media (max-width: 460px) {
		font-size: 14px;	
	}
`
const HeroSVG = styled.div`
	position: absolute;
	bottom: 0;
	background-color: var(--text1);
	width: 100%;
	z-index: 10;
`
const SectionsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`
const SectionTitle = styled.h1`
	color: var(--gray1);
	text-align: center;
	font-size: 36px;
	font-weight: 600;
	margin-bottom: 32px;
	z-index: 10;
	
	@media (max-width: 460px) {
		font-size: 24px;
		margin-bottom: 21px;	
	}
`
const PricingSVG = styled.div`
	background-image: url('${pricing_svg}');
	background-color: #fafaff;
	width: 99vw;
	height: 100%;
	position: absolute;
	z-index: 1;
`
const Pricing = styled.section`
	width: 720px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	padding: 56px 0;

	& > ul {
		font-size: 21px;
		list-style: inside;
		width: 92%;
		text-align: center;
		z-index: 10;
		
		@media (max-width: 460px) {
			font-size: 17px;
			line-height: 1.1em;
		}
	}

	& > ul > li {
		margin-bottom: 12px;
	}

	& > p {
		margin-top: 9px;
		opacity: 0.5;
		font-size: 13px;
		font-weight: 600;
		text-align: center;
		z-index: 10;
	}

	@media (max-width: 760px) {
		width: 92%
	}
`
const Features = styled.section`
	width: 720px;
	padding: 56px 0 112px 0;
	justify-content: center;
	display: flex;
	flex-direction: column;

	@media (max-width: 760px) {
		width: 92%
	}
`
const FCardsWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-auto-rows: 142px;
	justify-content: center;
	grid-gap: 32px;

	@media (max-width: 760px) {
		grid-template-columns: 320px;
	}
`
const FCard = styled.div`
	box-shadow: 4px 6px 6px 0 rgba(0, 0, 0, 0.14);
	background-color: #fdfdff;
	border-radius: 8px;
	padding: 18px 21px;
	color: var(--gray1);
	cursor: pointer;

	& > h2 {
		font-size: 21px;
		font-weight: 600; 
		display: flex;
		align-items: center;
		position: relative;

		& > .f-card-i {
			color: var(--brand);
			margin-right: 8px;
		}
	}

	.f-card-t {
		font-weight: 700;
		color: var(--brand);
		font-size: 12px;
		display: block;
	}

	& > p {
		font-size: 17px;
		line-height: 1.2em;
		margin-top: 6px;
		text-align: center;
	}
` 
const FAQ = styled.section`
	background-color: var(--gray1);
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
	padding-bottom: 56px;

	& > h1 {
		margin-top: 42px;
		color: var(--text1);

		@media (max-width: 460px) {
			margin-top: 21px;
		}
	}
`

const FAQ_SVG = styled.div`
	background-image: url('${faq_svg}');
	opacity: 0.12;
	width: 100%;
	height: 100%;
	left: 0;
	background-size: 80%;
	position: absolute;
	pointer-events:none
`


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
		this.intervalNum = setInterval(() => {
			//random number of songs (min 69, max 1420) in playlist. 
			//new number every 3sec
			const SONGS_NUM = this.newRandomNumber(69, 1420);
			document.getElementById('playlist-num').innerHTML = 'Num. of songs: ' + SONGS_NUM;
			

			//every 3sec random cover art for playlist (1-5)
			this.setState({
				COVER_URL: require('../assets/cover'+ this.newRandomNumber(1, 5) +'.jpg'),
				NAME_NUM: this.newRandomNumber(0, 4)
			})


			//every 3sec random % number to pare down playlist by, then displaying new number of songs in pared down version of playlist
			const PARE_DOWN = this.newRandomNumber(32, 88);
			document.getElementById('playlist-newNum').innerHTML = 'Num. of songs: ' + Math.floor(SONGS_NUM * (PARE_DOWN / 100));

			const preview_l = document.getElementById('preview-left');
			const preview_r = document.getElementById('preview-right');
			preview_l.style.webkitAnimation = 'none';
			preview_r.style.webkitAnimation = 'none';
			setTimeout(function() {
				preview_l.style.webkitAnimation = '';
				preview_r.style.webkitAnimation = '';
			}, 10);
		}, 3000)
	}


	generateStep() {
		this.intervalStep = setInterval(() => {
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

	componentWillUnmount() {
		clearInterval(this.intervalNum);
		clearInterval(this.intervalStep);
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
		<div style={{backgroundColor: 'var(--text1)'}}>
			<GlobalStyle/>
			<HeroWrapper>
				
				<Header/>
				
				<IntroWrapper>
					<IntroHeader>
						DUPLICATE YOUR PLAYLIST WITH REDUCED NUMBER OF SONGS
					</IntroHeader>
					<IntroDesc>
						Create smaller copies of your playlists so you can use less data when downloading them to enjoy listening to music in offline mode.
					</IntroDesc>
					<Button
						text = 'Pare Down'
						color = 'var(--text1)'
						bgColor = 'var(--brand)'
						href = '/dashboard'
						fSize = '19px'
						width = '160px'
						height = '54px'
					/>
				</IntroWrapper>

				<PreviewWrapper>
					<div id='preview-left'>
						<PlaylistNum id="playlist-num">
							Num. of songs: 72
						</PlaylistNum>
						<PlaylistImg 
							src={COVER_URL}
							alt='example playlist cover' 
						/>
						<PlaylistName>
							{PLAYLIST_NAME[this.state.NAME_NUM]}
						</PlaylistName>
					</div>	

					<PreviewTextWrapper>
						<p className='text-done step'>{PD_PROGRESS[STEP1]}</p>
						<p className='text-now step'>{PD_PROGRESS[STEP2]}</p>
						<p className='text-next step'>{PD_PROGRESS[STEP3]}</p>
					</PreviewTextWrapper>

					<div id='preview-right'>
						<PlaylistNum id="playlist-newNum">
							Num of songs: 56
						</PlaylistNum>
						<PlaylistImg
							src={COVER_URL}
							alt='example playlist cover' 
						/>
						<PlaylistName>
							Pared Down {PLAYLIST_NAME[NUM]}
						</PlaylistName>
					</div>
				</PreviewWrapper>

				<PlatformsWrapper>
					<PlatformsText>
						works with:
					</PlatformsText>

					<div style={{display: 'flex'}}>
							<PlatformIcon
								bgColor='#1ed760'
								size={'26px'}
								bRadius={'8px'}
								mRight={'8px'}
								icon={spotify}
							/>
							<PlatformIcon
								bgColor='#fff'
								size={'26px'}
								bRadius={'8px'}
								icon={apple_music}
							/>
					</div>
				</PlatformsWrapper>

				<HeroSVG><img src={require('../assets/wave.svg')} alt=''/></HeroSVG>
			</HeroWrapper>

			<SectionsWrapper>
				<Pricing id='pricing'>
				<PricingSVG/>	
				
				<SectionTitle>Free and secure</SectionTitle>
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
				</Pricing>

				<Features id='features'>
					<SectionTitle>Features</SectionTitle>
					<FCardsWrapper>
						<FCard>
							<h2>
								<Copy className='f-card-i' size={34}/>
								Duplicate playlists
							</h2>
							<p>
								Create smaller copies of your playlists quickly and easily, reduced to a certain number of songs.
							</p>
						</FCard>
						<FCard>
							<h2>
								<Calendar className='f-card-i' size={34}/>
								<span>
									<span className='f-card-t'>SOON</span>
									Calendar
								</span>
							</h2>
							<p>
								A place where you can check the premiers of the songs of your favorite artists.
							</p>
						</FCard>
						<FCard>
							<h2>
								<Cloud className='f-card-i' size={34}/>
								Popular platforms
							</h2>
							<p>
								PareDown supports two most popular music streaming platforms (Apple Music & Spotify).
							</p>
						</FCard>
						<FCard>
							<h2>
								<GitPullRequest className='f-card-i' size={34}/>
								Actively developed
							</h2>
							<p>
								You can expect even more exciting features in the future.
							</p>
						</FCard>
					</FCardsWrapper>
				</Features>

				<FAQ id='faq'>
					<div><FAQ_SVG/></div>
						
						
							<SectionTitle>FAQ</SectionTitle>
								<FaqCard 
									Q='Is there really only a free plan with no hidden payments? '
									A="Yes. By clicking 'Pare Down' or 'Go to the App' button you gain access to all the features that PareDown currently supports."
									id={0}
								/>
								<FaqCard 
									Q='Are there any plans to add a paid version of PareDown?'
									A="No. PareDown is completely free and that's how it will stay. Also it is a fully open source project, so you can go and host your own version of it for free."
									id={1}
								/>
								<FaqCard
									Q='Name, description and cover for the pared down playlist - Can I choose them?'
									A='At this time, these features are not supported by PareDown.'
									id={2}
								/>
								<FaqCard 
									Q='I want to pare down playlist from X music platform? Is it supported?'
									A='PareDown currently supports Spotify and Apple Music, but other music platforms will be added over time (if possible).'
									id={3}
								/>
								<FaqCard 
									Q='Is there an option to pare down several playlists at once?'
									A='This is one of the features that I would like to add in the future to PareDown.'
									id={4}
								/>
								<FaqCard
									Q='It says that PareDown is currently unavailable, why?'
									A='This is due to the temporary unavailability of one of the music platforms that are used by PareDown.'
									id={5}
								/>
								<FaqCard 
									Q='I think I found a bug, where can I report it?'
									A='You can submit it in github PareDown repository. Please choose appropriate title and description.'
									id={6}
								/>
								<FaqCard 
									Q='I have this great idea for PareDown, where can I submit it?'
									A='You can submit it in github PareDown repository. Please choose appropriate title and description.'
									id={7}
								/>
								<FaqCard 
									Q='What user data is collected, accessed and saved by PareDown?'
									A="For PareDown to work fully, you need to grant it access to one of the supported platforms. By doing that the application now have access to the following data: manage your public playlis, manage and view your private playlists, view your profile. This is the only data that is accesed by PareDown and is NOT saved or collected for later use."
									id={8}
								/>
				</FAQ>
			</SectionsWrapper>

			<Footer/>
		</div>
        );
    }
}