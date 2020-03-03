import React, { useState, useEffect  } from "react";
import styled from 'styled-components';
import { ArrowDown, ArrowUp } from 'react-feather';
import PlaylistTrackSmall from './PlaylistTrackSmall';
import { Spinner } from "../components";


const StyledStep2 = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	& > label {
		color: var(--text2);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.6px;

		#input-req {
			color: var(--brand);
			text-transform: lowercase;
		}
	}

	& > #p-number {
		max-width: 100%;
		margin-bottom: 21px;
		border-radius: 4px;
		border: solid 1px var(--gray3);
		background-color: var(--gray2);
		padding: 6px 12px;
		color: var(--text1);
	}
`
const OrderBtn = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: var(--gray2);
	font-weight: 500;
	font-size: 16px;
	cursor: pointer;
	color: var(--text2);
	border: 1px solid var(--gray3);
	width: 110px;

	:hover {
		opacity: 0.8;
	}

	& > span {
		margin: 6px 0;
		margin-left: 4px;
	}
`
const OrderWrapper = styled.div`
	display: flex;
	align-items: center;

	& > p {
		margin-left: 6px;
		text-transform: uppercase;
		font-size: 18px;
		color: var(--brand);
	}
`
const TracksWrapper = styled.div`
	margin-top: 8px;
	border-top: 1px solid var(--gray3);
	border-bottom: 1px solid var(--gray3);
	background-color: var(--gray2);
	overflow-y: scroll;
	height: 348px;
`


const Step2 = (props) => {
	//TODO: use props.new_order for sorting playlist
	let offset = 0;
	let check = 1;
	const [userTracks, setUserTracks] = useState([]);
	const [sortTracks, setSortTracks] = useState(true);
	const [loading, setLoading] = useState(true);


	async function fetchTracks() {
		const accessToken = localStorage.getItem('SpotifyAuth');
		const tracks_total = props.tracks_total;
		
		fetch(`https://api.spotify.com/v1/playlists/${props.playlistID}/tracks?fields=items(track)&offset=${offset}`, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((data) => {
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
						pos: offset !== 0 || check === 0 ? tracks_total - i : i + 1,
						cover: item.track.album.images[1].url ? item.track.album.images[1].url : ''
					}
				})
			);

			for(let i=0; i<4; i++) {
				const loc = data.items[i].track.album.images[1].url
				const url = loc ? loc : '';
				props.setCoverTile(coverTile => [...coverTile, url]);
			}

			setLoading(false);
		})
	}

	useEffect(() => {
		fetchTracks();
	}, [])


	const sortHandle = () => {
		const tracks_total = props.tracks_total;
		if(sortTracks) {
			offset = tracks_total >= 100 ? tracks_total - 100 : 0;
			check = tracks_total >= 100 ? 1 - 100 : 0;//TODO: what?
		} else {
			offset = 0;
		}
		
		props.setCoverTile([]);
		fetchTracks();
	}


	const newPlaylist = props.newPlaylist;
	const inputHandle = (e) => {
		const target = e.target;
		const name = target.name;
		return props.setNewPlaylist({...newPlaylist, [name]: target.value});
	}


	return (
		<StyledStep2>
			<label htmlFor='p-title'>number of songs <span id='input-req'>(required)</span></label>
			<input
				name='new_num_tracks'
				type='text' 
				id='p-number' 
				required 
				placeholder={
					newPlaylist.new_num_tracks.length === 0
					? 'Playlist Name'
					: newPlaylist.new_num_tracks
				} 
				onChange={e => inputHandle(e)}
			/>

			<OrderWrapper>
				<OrderBtn 
					onClick={() => {
						setSortTracks(!sortTracks);
						
						if(sortTracks) {
							props.setNewPlaylist({...newPlaylist, 'new_order': true});
						} else {
							props.setNewPlaylist({...newPlaylist, 'new_order': false});
						}

						sortHandle();
					}}
				>
					{
					sortTracks
						? <ArrowDown size={16}/>
						: <ArrowUp size={16}/>
					}
					<span>Order by</span>
				</OrderBtn>
				
				<p>
					displaying 100 songs
				</p>
			</OrderWrapper>

			<TracksWrapper>
				{
					!loading ?
						userTracks ? 
							userTracks.map((p, i) => 
								<PlaylistTrackSmall
									playlist={p} 
									key={i}
								/>
							)
						: null
					: <Spinner/>
				}
			</TracksWrapper>
		</StyledStep2>
	)
}
export default Step2;