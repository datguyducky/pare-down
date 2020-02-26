import React, { Component } from 'react';
import { BrandSmall, PlatformIcon, ButtonBorder, PlaylistCard } from '../components';
import queryString from 'query-string';

import '../utils/reset.css';
import '../utils/colors.css'
import './Dashboard.css';

const spotify = require('../assets/spotify.png');
const apple_music = require('../assets/apple_music.png');


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
		//localStorage.setItem('SpotifyRef');
		const refresh_token = localStorage.getItem('SpotifyRef');

		if(refresh_token) {
			console.log(refresh_token)
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
			? 'http://localhost:3000/' 
			: 'http://pare-down.mtymon.me/'
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
			<div id='dashboard-pd'>
				<nav className='pd-nav'>
					<header className='pd-header'>
						<BrandSmall/>
					</header>
					<ul>
						<li onClick={this.platformSync}>
							<PlatformIcon
								bgColor='#1ed760'
								size={64}
								sizeRadius={10}
								name={spotify}
							/>
							<div 
								className='platform-status'
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
								size={64}
								sizeRadius={10}
								name={apple_music}
							/>
							<div 
								className='platform-status'
								style={{
									backgroundColor: AppleAuth
									? '#37ed8f'
									: '#ed373a'
								}}
							/>
						</li>
					</ul>
				</nav>

				<div className='playlists-wrapper'>
					<header>
						<h1>
							Select Playlist
						</h1>

						<ButtonBorder
							href = '#'
							text = 'Switch to calendar'
							display = 'flex'
							bSize = '2px'
							bColor = 'var(--brand)'
							className = 'pd-switcher'
						/>
					</header>

					<div className='cards-wrapper'>
						{
							this.state.userPlaylists ?
								userPlaylistsToRender.map((p, i) => 
									<PlaylistCard
										playlist={p} 
										key={i} 
										userID={this.state.userID} 
									/>
								)
							: null
						}
					</div>
				</div>
			</div>
		)
	}
}
