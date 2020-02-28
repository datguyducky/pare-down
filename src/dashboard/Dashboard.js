import React, { Component } from 'react';
import { ButtonBorder } from '../components';
import PlaylistCover from './PlaylistCover';
import queryString from 'query-string';
import styled, { createGlobalStyle } from 'styled-components';

import '../utils/reset.css';
import '../utils/colors.css'
import DashboardNav from './DashboardNav';


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

		this.spotifyFetch = this.spotifyFetch.bind(this);
		this.platformSyncRefresh = this.platformSyncRefresh.bind(this);
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
				<DashboardNav />

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
										history={this.props.history}
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
