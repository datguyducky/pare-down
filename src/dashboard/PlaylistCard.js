import React, { useEffect, useState } from "react";
import styled, { createGlobalStyle } from 'styled-components';
import { Spinner, Warning, PopUp, Emoji } from '../components/';
import { useLocation, Link } from "react-router-dom";
import { ArrowLeft, Globe, Copy, Trash, Edit, ArrowDown, ArrowUp  } from 'react-feather';
import DashboardNav from './DashboardNav';
import PlaylistTrack from "./PlaylistTrack";
import PareDownCard from './PareDownCard';
import EditCard from "./EditCard";
import PlaylistTrackSmall from "./PlaylistTrackSmall";


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
	position: relative;

	@media (max-width: 1360px) {
		grid-gap: 12px;
	}

	@media (max-width: 1060px) {
		grid-template-columns: 62px 1fr;
	}


	@media (max-width: 760px) {
		grid-template-columns: 1fr;
		grid-template-rows: 46px 1fr;
	}
`
const CardWrapper = styled.div`
	width: 1240px;
	margin: 12px auto;

	@media (max-width: 1360px) {
		width: 100%;
	}

	@media (max-width: 760px) {
		margin-top: 72px;
	}
`
const DetailsHeader = styled(Link)`
	display: inline;
	color: inherit;
	text-decoration: none;
	
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

		@media (max-width: 760px) {
			border-radius: 0;
			font-size: 22px;
		}

		& > svg {
			margin-right: 6px;
		}
	}

	:hover {
		opacity: 0.7;
	}

	@media (max-width: 760px) {
		display: grid;
	}
`
const Details = styled.div`
	display: flex;
	background-color: var(--gray2);
	padding: 32px 29px;
	border: 1px solid var(--gray3);
	border-top-right-radius: 6px;
	box-shadow: 0px -8px 8px 0 rgba(0, 0, 0, 0.18);

	@media (max-width: 760px) {
		padding: 21px 14px;
		align-items: center;
		flex-direction: column;
		text-align: center;
	}
`
const DetailsCover = styled.div`
	background-image: url(${props => props.bgimg || 'none'});
	min-width: 180px;
	min-height: 180px;
	border-radius: 4px;
	background-repeat: no-repeat;
	background-size: 100% 100%;
	background-position: center;
	box-shadow: 2px 2px 6px 0 rgba(0, 0, 0, 0.32);

	@media (max-width: 1090px) {
		min-width: 120px;
		min-height: 120px;
	}
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
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 460px;
		overflow: hidden;

		@media (max-width: 690px) {
			width: 240px;
			font-size: 24px;
		}
	}

	& > p {
		margin-top: 14px;
		width: 86%;
		font-size: 16px;
		font-weight: normal;
		color: var(--text2);
		line-height: 1.2em;
		text-overflow: ellipsis;
		white-space: break-world;
		word-wrap: break-word;
		word-break: break-all;
		height: 58px;
		overflow: hidden;
	}

	@media (max-width: 760px) {
		align-items: center;
		margin-left: 0;
	}
`
const DetailsList = styled.ul`
	display: flex;
	align-items: center;
	color: var(--text2);
	font-size: 16px;
	font-weight: normal;
	flex-flow: wrap;
		
	& > li {
		display: flex;
		align-items: center;
		padding: 0 6px;
		border-right: 1px solid var(--text2);
		margin-top: 4px;

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

	@media (max-width: 760px) {
		justify-content: center;
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
			color: var(--brand);
		}

		& > span {
			margin-left: 4px;
		}
	}
`
const TracksWrapper = styled.div``
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

		@media (max-width: 1090px) { 
			display: none;
		}

		:nth-of-type(1) {
			display: flex;
		}

		:nth-of-type(2) {
			display: flex;
		}
	}

	@media (max-width: 1090px) {
		grid-template-columns: auto 1fr;
	}
`
const Tracks = styled.div`
	background-color: var(--gray2);
	box-shadow: 0px 8px 8px 0 rgba(0, 0, 0, 0.18);

	.sm-tracks {
		display: none;
	}

	@media (max-width: 1090px) {
		.md-tracks {
			display: none;
		}

		.sm-tracks {
			display: flex;
		}
	}
`
const WarningCardWrapper = styled.div`
	height: 100vh;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
`


const PlaylistCard = (props) => {
	const l = useLocation();
	let offset = 0;
	let check = 1;
	const [userTracks, setUserTracks] = useState([]);
	const [sortTracks, setSortTracks] = useState(true);
	const [followersTotal, setFollowersTotal] = useState(0)
	const [loading, setLoading] = useState(true);
	const [displaySteps, setDisplaySteps] = useState(false);
	const [editState, showEdit] = useState(false);
	const [deleteState, showDelete] = useState(false);
	const [deletePopUpState, showDeletePopUp] = useState(false);


	async function fetchTracks() {
		const accessToken = localStorage.getItem('SpotifyAuth');
		const tracks_total = l.state.tracks_total;
		
		fetch(`https://api.spotify.com/v1/playlists/${l.state.id}/tracks?fields=items(track)&offset=${offset}`, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then((response) => {
			if(response.ok) {
				return response.json()
			}
		})
		.then((data) => {
			if(data) {
				if(offset !== 0 || check === 0 ) {
					data.items.reverse();
				}
				
				setUserTracks(
					data.items.map((item, i) => {
						return {
							name: item.track.name,
							artists: item.track.artists[0].name,
							album: item.track.album.name,
							duration_ms: item.track.duration_ms,
							pos: offset !== 0 || check === 0 ? tracks_total - i : i + 1
						}
					})
				);
				setLoading(false);
			}
		})
	}


	useEffect(() => {
		async function followCount() {
			const accessToken = localStorage.getItem('SpotifyAuth');
		
			fetch(`https://api.spotify.com/v1/playlists/${l.state.id}?fields=followers`, {
				headers: {
					'Authorization': 'Bearer ' + accessToken
				}
			})
			.then(response => response.json())
			.then((data) => {
				if(data.followers) {
					setFollowersTotal(data.followers.total)
				}
			})
		}


		followCount();
		fetchTracks();
	}, [])


	const sortHandle = () => {
		const tracks_total = l.state.tracks_total;
		if(sortTracks) {
			offset = tracks_total >= 100 ? tracks_total - 100 : 0;
			check = tracks_total >= 100 ? 1 : 0;
		} else {
			offset = 0;
		}
		
		fetchTracks();
	}


	const followFormat = (num) => {
		return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
	}


	const StepShow = () => {
		setDisplaySteps(false);
	}


	const editHandler = () => {
		showEdit(false);
	}


	const deleteNoHandler = () => {
		showDelete(false);
	}


	const deleteYesHandler = async () => {
		const accessToken = localStorage.getItem('SpotifyAuth');
		fetch(`https://api.spotify.com/v1/playlists/${l.state.id}/followers`, {
			method: 'DELETE',
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then((response) => {
			response.ok
			? showDeletePopUp(true)
			: console.log(response.status)
		})
		
		document.getElementById('warning-card').style.display = 'none';
	}

	
	const deletePopUpHandler = () => {
		props.history.push('/dashboard');
	}
	
	return (
		<StyledPlaylistCard>
			<GlobalStyle />
			<DashboardNav />
				
			<CardWrapper>
				<div>
					<DetailsHeader to='/dashboard'>
						<h1> <ArrowLeft size={28}/> Playlist details </h1>
					</DetailsHeader>
					
					<Details>
						<DetailsCover bgimg={l.state.cover}/>

						<Playlist>
							<h2>{l.state.name}</h2>
							<DetailsList>
								<li> By {l.state.owner} </li>
								<li style={{color: 'var(--brand)'}}>{l.state.service}</li>
								<li> {l.state.tracks_total} tracks </li>
								<li>
									<Emoji 
										symbol='❤️' 
										label='heart' 
										color='red'
									/> 
									<span style={{marginLeft: 4}}>
										{followFormat(followersTotal)} followers 
									</span>
								</li>
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
								<li onClick={() => {
									setDisplaySteps('flex');
								}}>
									<Copy size={14}/>
									<span>Pare Down</span>
								</li>
								<li onClick={() => {
									showEdit(true)
								}}>
									<Edit size={14}/>
									<span>Edit</span>
								</li>
								<li onClick={() => {
									showDelete(true)
								}}>
									<Trash size={14}/>
								</li>
							</BtnList>
						</Playlist>
					</Details>
				</div>

				<TracksWrapper>
					<TracksDetails>
						<li style={{cursor: 'pointer'}} onClick={() => {
							setSortTracks(!sortTracks);
							sortHandle();
						}}>
							#
							{
								sortTracks
								? <ArrowDown size={18}/>
								: <ArrowUp size={18}/>
							}
						</li>
						<li>
							TITLE
						</li>
						<li>ARTIST</li>
						<li>ALBUM</li>
						<li>SERVICE</li>
						<li>DURATION</li>
					</TracksDetails>
					
					<Tracks>
						{
							!loading ?
								userTracks ?
									userTracks.map((p, i) =>
										<div key={'wrap' + i}>
											<PlaylistTrack
												playlist={p} 
												key={i}
												id={p.pos}
												service={l.state.service}
												classProp='md-tracks'
											/>
											<PlaylistTrackSmall
												classProp='sm-tracks'
												playlist={p} 
												key={'m'+i}
											/>
										</div>
									)	
								: null
							: <Spinner/>
						}
					</Tracks>
				</TracksWrapper>
			</CardWrapper>

			{
			displaySteps ?
				<PareDownCard 
					playlistID={l.state.id}
					tracks_total={l.state.tracks_total}
					display='flex'
					yes_action={StepShow}
					desc={l.state.description}
					title={l.state.name}
					privacy={l.state.public}
					cover={l.state.cover}
					userID={l.state.userID}
					setDisplaySteps={setDisplaySteps}
				/>
			: null
			}

			{
			editState ?
				<EditCard
					playlistID={l.state.id}
					yes_action={editHandler}
					desc={l.state.description}
					title={l.state.name}
					privacy={l.state.public}
					showEdit={showEdit}
				/>
			: null
			}

			{
			deleteState ?
				<WarningCardWrapper>
					<Warning
						bgColor='var(--text1)'
						color='var(--gray2)'
						fSize='14px'
						width='460px'
						height='208px'
						bColor='var(--gray3)'
						display='flex'
						header={`CONFIRM DELETE`}
						text={`Warning! By clicking "YES" ${l.state.name.substring(0, 32)} playlist will be deleted from your library!`}
						setWarningDisplay={showDelete}
						no_action={deleteNoHandler}
						yes_action={deleteYesHandler}
					/>
				</WarningCardWrapper>
			: null
			}

			{
			deletePopUpState ?
				<PopUp
					text={`${l.state.name.substring(0, 32)} playlist has been removed from your library! 👍`}
					hide={deletePopUpHandler}
				/>
			: null
			}
		</StyledPlaylistCard>
	)
}

export default PlaylistCard;