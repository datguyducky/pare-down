import React, { Component } from 'react';
import { ButtonBorder, Spinner } from '../components';
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

	@media (max-width: 1060px) {
		grid-template-columns: 62px 1fr;
	}


	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		grid-template-rows: 46px 1fr;
	}
`
const DashboardWrapper = styled.div`
	padding: 24px 0;
	display: flex;
	flex-direction: column;
	width: 100%;

	@media (max-width: 760px) {
		margin-top: 52px;
	}
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

		@media (max-width: 760px) {
			font-size: 24px;
		}

		@media (max-width: 580px) {
			font-size: 18px;
		}

		@media (max-width: 420px) {
			margin-bottom: 8px;
		}
	}

	@media (max-width: 760px) {
		justify-content: center;
		padding-left: 0;
	}


	@media (max-width: 420px) {
		flex-direction: column;
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

		@media (max-width: 760px) {
			padding: 4px 8px;
		}
	}
`
const PlaylistsCoverWrapper = styled.div`
	padding-top: 24px;
	display: grid;
	grid-template-columns: repeat(auto-fit, 180px);
	grid-gap: 18px;
	justify-content: center;

	@media (max-width: 760px) {
		padding-bottom: 24px;
	}

	@media (max-width: 580px) {
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fit, 120px);
	}
`
const PreLogin = styled.p`
	text-align: center;
	color: var(--text1);
	font-size: 21px;
	text-transform: uppercase;
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
		window.location = window.location.href.includes('localhost') 
		? 'http://localhost:8888/login' 
		: 'http://pare-down-backend.mtymon.me/login'
	}


	spotifyFetch() {
		const accessToken = localStorage.getItem('SpotifyAuth');
		if(accessToken) {
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
				if(r.ok) {
					return r.json();
				} else {
					this.platformSyncRefresh();
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
								service: 'Spotify',
								description: item.description,
								tracks_total: item.tracks.total,
								public: item.public,
								owner: item.owner.display_name,
							}
						})
					})
				}
			})
		}
	}


	async componentDidMount() {
		let parsed = queryString.parse(window.location.search);
		let access_token = parsed.access_token;
		if (access_token) {
			localStorage.setItem('SpotifyAuth', access_token);
			window.location = window.location.href.includes('localhost')
			? 'http://localhost:3000/dashboard/' 
			: 'http://pare-down.mtymon.me/dashboard/'
		}


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
		const SpotifyAuth  = localStorage.getItem('SpotifyAuth');

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
							: SpotifyAuth 
								? <Spinner/>
								: <PreLogin>Log in to Spotify to continue.</PreLogin>
						}
					</PlaylistsCoverWrapper>
				</DashboardWrapper>
			</StyledDashboard>
		)
	}
}
