import React, { Component } from 'react';
import { BrandSmall, PlatformIcon, ButtonBorder } from '../components';
import PlaylistCover from './PlaylistCover';
import queryString from 'query-string';
import styled, { createGlobalStyle } from 'styled-components';

import '../utils/reset.css';
import '../utils/colors.css'

const spotify = require('../assets/spotify.png');
const apple_music = require('../assets/apple_music.png');


const GlobalStyle = createGlobalStyle`
 	body {
		font-family: Source Sans Pro, sans-serif;
		background-color: var(--gray1);
	}
`
const StyledDashboard = styled.div`
	display: grid;
	grid-template-columns: 92px 1fr;
`
const Nav = styled.nav`
	background-color: var(--gray2);
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	border-right: 2px solid var(--gray3);
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.32);

	& > ul > li {
		margin-top: 18px;
		position: relative;
		cursor: pointer;
	}
`
const NavHeader = styled.header`
	padding: 18px 0;
	width: 100%;
	text-align: center;
	border-bottom: 2px solid var(--gray3);
`
const PlatformIconStatus = styled.div`
	position: absolute;
	bottom: -4px;
	right: -4px;
	height: 12px;
	width: 12px;
	border-radius: 12px;
	border: 1px solid var(--gray3);
	background-color: #ed373a;
	z-index: 100%;
`
const DashboardWrapper = styled.div`
	padding: 24px 0;
	display: flex;
	flex-direction: column;
	width: 100%;
`
const DashboardHeader = styled.header`
	color: var(--text1);
	display: flex;
	align-items: center;
	padding-left: 18px;

	& > h1 {
		font-size: 36px;
		font-weight: 600;
		letter-spacing: 0.3px;
		text-align: center;
		color: var(--text1);
		margin-right: 18px;
	}


	#dashboard-btn {
		text-decoration: none;
		color: inherit;
		align-items: center;
		justify-content: center;
		padding: 4px 18px;

		:hover {
			background-color: var(--brand) !important;
			border-color: var(--brand) !important;
			color: var(--text1) !important;
		}
	}
`
const PlaylistsCoverWrapper = styled.div`
	margin-top: 24px;
	display: grid;
	grid-template-columns: repeat(auto-fit, 180px);
	grid-gap: 18px;
	justify-content: center;
`


export default class Dashboard extends Component {
	constructor() {
		super()
		this.state = {
			SpotifyAuth: '',
			AppleAuth: '',
			filterString: '',
		}

		this.platformSync = this.platformSync.bind(this);
		this.spotifyFetch = this.spotifyFetch.bind(this);
		this.platformSyncRefresh = this.platformSyncRefresh.bind(this);
	}


	platformSync() {
		window.location = window.location.href.includes('localhost') 
		? 'http://localhost:8888/login' 
		: 'http://pare-down-backend.mtymon.me/login'
	}

	platformSyncRefresh() {
		const refresh_token = localStorage.getItem('SpotifyRef');

		if(refresh_token) {
			if(refresh_token !== 'undefined') {
				window.location = window.location.href.includes('localhost') 
				? `http://localhost:8888/refresh?refresh_token=${refresh_token}` 
				: `http://pare-down-backend.mtymon.me/refresh?refresh_token=${refresh_token}`
			}
		}
	}


	spotifyFetch() {
		if(localStorage.getItem('SpotifyAuth')) {
			const accessToken = localStorage.getItem('SpotifyAuth');

			fetch('https://api.spotify.com/v1/me', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then(response => response.json())
            .then(data => this.setState({
                userID: data.id
            }))

        	fetch(`https://api.spotify.com/v1/me/playlists?limit=50`, {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            .then((r) => {
				if(r.status === 401) {
					this.platformSyncRefresh();
				} else {
					return r.json();
				}
			})
			//
            .then((data) => {
				if(data) {
					this.setState({
						userPlaylists: data.items.map(item => {
							if (item.images.length === 0) {
								item.images.push('')
							}
							return {
								name: item.name,
								cover: item.images[0].url,
								songsNum: item.tracks.total,
								id: item.id,
								service: 'Spotify'
							}
						})
					})
				}
			})
		}
	}


	async componentDidMount() {
		let parsed = queryString.parse(window.location.search);
		let refresh_token = parsed.refresh_token;
		let redirect_auth = parsed.access_token;
		if (redirect_auth) {
			if(refresh_token !== undefined) {
				localStorage.setItem('SpotifyRef', refresh_token);
			}
			localStorage.setItem('SpotifyAuth', redirect_auth);
			window.location = window.location.href.includes('localhost')
			? 'http://localhost:3000/dashboard/' 
			: 'http://pare-down.mtymon.me/dashboard/'
		}

		this.setState({
			SpotifyAuth: localStorage.getItem('SpotifyAuth')
		})

		this.spotifyFetch();
	}

	
	render() {
		const SpotifyAuth = this.state.SpotifyAuth;
		const AppleAuth = this.state.AppleAuth;
		let userPlaylistsToRender = this.state.userPlaylists 
			? this.state.userPlaylists.filter(p =>
                p.name.toLowerCase().includes(
					this.state.filterString.toLowerCase()
				),
			) 
			: [];


		return (
			<StyledDashboard>
				<GlobalStyle />
				<Nav>
					<NavHeader>
						<BrandSmall/>
					</NavHeader>
					<ul>
						<li onClick={this.platformSync}>
							<PlatformIcon
								bgColor='#1ed760'
								size={'64px'}
								bRadius={'10px'}
								icon={spotify}
							/>
							<PlatformIconStatus
								style={{
									backgroundColor: SpotifyAuth !== 'undefined'
									? '#37ed8f'
									: '#ed373a'
								}}
							/>
						</li>
						
						<li>
							<PlatformIcon
								bgColor='#fff'
								size={'64px'}
								bRadius={'10px'}
								icon={apple_music}
							/>
							<PlatformIconStatus
								style={{
									backgroundColor: AppleAuth
									? '#37ed8f'
									: '#ed373a'
								}}
							/>
						</li>
					</ul>
				</Nav>

				<DashboardWrapper>
					<DashboardHeader>
						<h1>
							Select Playlist
						</h1>

						<ButtonBorder
							href = '#'
							text = 'Switch to calendar'
							display = 'flex'
							bSize = '2px'
							bColor = 'var(--brand)'
							id='dashboard-btn'
						/>
					</DashboardHeader>

					<PlaylistsCoverWrapper>
						{
							this.state.userPlaylists ?
								userPlaylistsToRender.map((p, i) => 
									<PlaylistCover
										playlist={p} 
										key={i} 
										userID={this.state.userID} 
									/>
								)
							: null
						}
					</PlaylistsCoverWrapper>
				</DashboardWrapper>
			</StyledDashboard>
		)
	}
}
