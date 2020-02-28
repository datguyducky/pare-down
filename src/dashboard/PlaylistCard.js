import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { useLocation } from "react-router-dom";
import { ArrowLeft, Globe, Copy, Trash, Edit, ArrowDown  } from 'react-feather';
import DashboardNav from './DashboardNav';
import PlaylistTrack from "./PlaylistTrack";


const GlobalStyle = createGlobalStyle`
	body {
		font-family: Source Sans Pro, sans-serif;
		background-color: var(--gray1);
		color: var(--text1);
	}
`
const StyledPlaylistCard = styled.div`
	display: grid;
	grid-template-columns: 92px 1fr;
`
const CardWrapper = styled.div`
	width: 1240px;
	margin: 12px auto;
`
const DetailsWrapper = styled.div`
	
`
const DetailsHeader = styled.header`
	background-color: red;
	display: inline;
	& > h1 {
		box-shadow: 0px -3px 8px 0 rgba(0, 0, 0, 0.32);
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background-color: var(--gray2);
		padding: 8px 29px;
		font-size: 28px;
		border: 1px solid var(--gray3);
		border-bottom: none;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
		font-weight: 600;

		& > svg {
			margin-right: 6px;
		}
	}
`
const Details = styled.div`
	display: flex;
	background-color: var(--gray2);
	padding: 32px 29px;
	border: 1px solid var(--gray3);
	border-top-right-radius: 6px;
	box-shadow: 0px -8px 8px 0 rgba(0, 0, 0, 0.18);
`
const DetailsCover = styled.div`
	background-image: url(${props => props.bgimg || 'none'});
	width: 180px;
	height: 180px;
	border-radius: 4px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
	box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.32);
`
const Playlist = styled.div`
	display: flex;
	flex-direction: column;
	padding-top: 18px;
	margin-left: 24px;

	& > h2 {
		font-size: 28px;
		font-weight: 600;
		margin-bottom: 4px;
	}

	& > p {
		margin-top: 14px;
		width: 86%;
		font-size: 16px;
		font-weight: normal;
		color: var(--text2);
		line-height: 1.2em;
	}
`
const DetailsList = styled.ul`
	display: flex;
	align-items: center;
	color: var(--text2);
	font-size: 16px;
	font-weight: normal;
		
	& > li {
		display: flex;
		align-items: center;
		padding: 0 6px;
		border-right: 1px solid var(--text2);

		:first-of-type {
			padding-left: 0px;
		}

		:last-of-type {
			border-right: none;
		}

		& > svg {
			margin-right: 4px;
			color: var(--brand);
		}
	}
` 
const BtnList = styled.ul`
	margin-top: auto;
	display: flex;

	& > li {
		display: flex;
		margin-right: 10px;
		justify-content: center;
		align-items: center;
		box-shadow: 3px 3px 2px 0 rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		background-color: var(--gray3);
		font-weight: 500;
		font-size: 15px;
		padding: 8px 12px;
		cursor: pointer;

		:hover {
			opacity: 0.88;
		}

		& > span {
			margin-left: 4px;
		}
	}
`
const TracksWrapper = styled.div`

`
const TracksDetails = styled.ul`
	display: grid;
	grid-template-columns: auto 1fr 160px 160px 120px 120px;
	grid-gap: 21px;
	padding: 21px 14px;
	border: 1px solid var(--gray3);
	border-top: none;
	box-shadow: 0px 0px 8px 0 rgba(0, 0, 0, 0.18);

	li {
		font-size: 16px;
		font-weight: 600;
		letter-spacing: 1.2px;
		display: flex;
		align-items: center;

		& > svg {
			margin-left: 4px;
			color: var(--brand);
		}
	}
`
const Tracks = styled.div`
	background-color: var(--gray2);
	box-shadow: 0px 8px 8px 0 rgba(0, 0, 0, 0.18);
`


const PlaylistCard = (props) => {
	const l = useLocation();
	let offset = 0;
	const [userTracks, setUserTracks] = useState([]);


	async function fetchTracks() {
		const accessToken = localStorage.getItem('SpotifyAuth');
		
		fetch(`https://api.spotify.com/v1/playlists/${l.state.id}/tracks?fields=items(track)&offset=${offset}`, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then(response => response.json())
		.then((data) => {
			if(offset !== 0) {
				data.items.reverse();
			}

			setUserTracks(
				data.items.map(item => {
					return {
						name: item.track.name,
						artists: item.track.artists[0].name,
						album: item.track.album.name,
						duration_ms: item.track.duration_ms	
					}
				})
			)
		})
	}


	useEffect(() => {
		fetchTracks();
	}, [])


	const sortHandle = () => {
		//TODO: option to sort again
		offset = l.state.tracks_total - 100;
		fetchTracks();
	}


	return (
		<StyledPlaylistCard>
			<GlobalStyle />
			<DashboardNav />
				
			<CardWrapper>
				<DetailsWrapper>
					<DetailsHeader>
						<h1> <ArrowLeft size={28}/> Playlist details </h1>
					</DetailsHeader>
					
					<Details>
						<DetailsCover bgimg={l.state.cover}/>

						<Playlist>
							<h2>{l.state.name}</h2>
							<DetailsList>
								<li> By {l.state.owner} </li>
								<li> {l.state.tracks_total} tracks </li>
								<li> 
									<Globe size={14}/>
									<span>
										{
											l.state.public
											? 'Public'
											: 'Private'
										}
									</span>
								</li>
							</DetailsList>

							<p>
								{l.state.description}
							</p>
							
							<BtnList>
								<li>
									<Copy size={14}/>
									<span>Pare Down</span>
								</li>
								<li>
									<Edit size={14}/>
									<span>Edit</span>
								</li>
								<li>
									<Trash size={14}/>
								</li>
							</BtnList>
						</Playlist>
					</Details>
				</DetailsWrapper>

				<TracksWrapper>
					<TracksDetails>
						<li>#</li>
						<li style={{cursor: 'pointer'}} onClick={sortHandle}>
							TITLE
							{	
								offset !== 0
								? <ArrowDown size={18}/>
								: <ArrowDown size={18}/>
							}
						</li>
						<li>ARTIST</li>
						<li>ALBUM</li>
						<li>SERVICE</li>
						<li>DURATION</li>
					</TracksDetails>
					
					<Tracks>
						{
							userTracks ?
								userTracks.map((p, i) => 
									<PlaylistTrack
										playlist={p} 
										key={i}
										id={i}
										service={l.state.service}
									/>
								)
							: null
						}
					</Tracks>
				</TracksWrapper>
			</CardWrapper>
		</StyledPlaylistCard>
	)
}

export default PlaylistCard;