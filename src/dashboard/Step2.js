import React, { useState, useEffect  } from "react";
import styled from 'styled-components';
import { ArrowDown, ArrowUp, Percent } from 'react-feather';
import PlaylistTrackSmall from './PlaylistTrackSmall';
import { Spinner } from "../components";


const StyledStep2 = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;

	label {
		color: var(--text2);
		margin-bottom: 4px;
		text-transform: uppercase;
		letter-spacing: 0.6px;

		#input-req {
			color: var(--brand);
			text-transform: lowercase;
		}
	}

	#p-number {
		max-width: 100%;
		margin-bottom: 21px;
		border-radius: 4px;
		border: solid 1px var(--gray3);
		background-color: var(--gray2);
		padding: 6px 12px;
		color: var(--text1);
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: 0;
	}
`
const InputWrapper = styled.div`
	button {
		height: 34px;
		width: 34px;
		background-color: var(--gray2);
		border: 1px solid var(--gray3);
		color: var(--text1);
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		cursor: pointer;

		&.percent {
			background-color: var(--gray3);
		}
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
	let offset = 0;
	let check = 1;
	const [userTracks, setUserTracks] = useState([]);
	const newPlaylist = props.newPlaylist;
	const [loading, setLoading] = useState(true);
	const [percentState, setPercent] = useState(false);


	async function fetchTracks() {
		const accessToken = localStorage.getItem('SpotifyAuth');
		const tracks_total = props.tracks_total;
		
		fetch(`https://api.spotify.com/v1/playlists/${props.playlistID}/tracks?fields=items(track)&offset=${offset}`, {
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then((response) => {
			if(response.ok){
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
							pos: offset !== 0 || check === 0 ? tracks_total - i : i + 1,
							cover: item.track.album.images[1].url ? item.track.album.images[1].url : ''
						}
					})
				);

				for(let i=0; i<4; i++) {
					const loc = data.items[i].track.album.images[2].url
					const url = loc ? loc : '';
					props.setCoverTile(coverTile => [...coverTile, url]);
				}

				setLoading(false);
			}
		})
	}

	useEffect(() => {
		fetchTracks();
	})


	const sortHandle = () => {
		const tracks_total = props.tracks_total;
		if(!newPlaylist.new_order) {
			offset = tracks_total >= 100 ? tracks_total - 100 : 0;
			check = tracks_total >= 100 ? 1 : 0;
		} else {
			offset = 0;
		}
		
		props.setCoverTile([]);
		fetchTracks();
	}


	const inputHandle = (e) => {
		const target = e.target;
		const name = target.name;
		const percent_btn = document.getElementById('percent-btn');
		
		
		if (!percent_btn.classList.contains('percent')) {
            if (e.target.checkValidity()) {
                return props.setNewPlaylist({
					...newPlaylist, 
					[name]: 
					target.value
				});
            } else {
				return props.setNewPlaylist({
					...newPlaylist, 
					[name]: 0
				});
            }
		} 
		
		else {
			if (e.target.checkValidity()) {
				return props.setNewPlaylist({
					...newPlaylist, [name]: 
					((props.tracks_total * target.value) / 100).toFixed(0)
				});
            } else {
				return props.setNewPlaylist({
					...newPlaylist, 
					[name]: 0
				});
            }
        }
	}

	const PercentHandle = () => {
		const percent_btn = document.getElementById('percent-btn');
		
		if(!percentState) {
			percent_btn.classList.add('percent');
		} else {
			percent_btn.classList.remove('percent');
		}
	}


	return (
		<StyledStep2>
			<label htmlFor='p-title'>number of songs <span id='input-req'>(required)</span></label>
			<InputWrapper>
				<input
					name='new_num_tracks'
					type='number' 
					id='p-number' 
					required 
					min='1'
					max={
						!percentState
						? props.tracks_total
						: '100'
					}
					placeholder={newPlaylist.new_num_tracks} 
					onChange={e => inputHandle(e)}
				/>
				<button 
					onClick={() => {
						setPercent(!percentState);
						PercentHandle();
					}} 
					id='percent-btn'
				>
					<Percent size={16}/>
				</button>
			</InputWrapper>

			<OrderWrapper>
				<OrderBtn 
					onClick={() => {
						if(!newPlaylist.new_order) {
							props.setNewPlaylist({...newPlaylist, 'new_order': true});
						} else {
							props.setNewPlaylist({...newPlaylist, 'new_order': false});
						}

						sortHandle();
					}}
				>
					{
					!newPlaylist.new_order
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