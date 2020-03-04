import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { ArrowLeft, X } from 'react-feather';
import Step1 from './Step1';
import { withRouter } from 'react-router-dom';
import { Warning, PopUp } from "../components";


const GlobalStyle = createGlobalStyle`
 	body {
		overflow: hidden;
	}
`
const StyledEditCard = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	display: 'flex';
`
const Overlay = styled.div`
	position: absolute;
	background-color: var(--gray3);
	opacity: 0.8;
	width: 100%;
	height: 100%;
	z-index: 10;
`
const EditEntrance = keyframes`
	0% {
		transform: scale(.7);
		opacity: 0;
	}
	80% {
		transform: scale(1.05);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
`
const EditCardWrapper = styled.div`
	z-index: 100;
	background-color: var(--gray2);
	height: 760px;
	width: 620px;
	box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.4);
	border-radius: 4px;
	border: 1px solid var(--gray3);
	position: relative;
	flex-direction: column;
	animation: ${EditEntrance} .15s linear;
`
const HeaderWrapper = styled.div`
	color: inherit;
	text-decoration: none;
	display: flex;
	flex-direction: column;
	background-color: var(--gray1);
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
	border-bottom: 1px solid var(--gray3);
	position: relative;
	padding: 9px 21px;
	z-index: -1;
	padding-bottom: 14px;
`
const Header = styled.button`
	background-color: transparent;
	border: none;
	border-radius: 0;
	color: inherit;
	text-decoration: none;

	& >	h1 {
		display: flex;
		align-items: center;  
		font-size: 24px;
		font-weight: 600;
	}
`
const HeaderDesc = styled.p`
	font-size: 14px;
	margin-top: 4px;
	margin-left: 4px;
	color: var(--text2);
`
const HeaderClose = styled.button`
	background-color: transparent;
	border: none;
	color: inherit;
	position: absolute;
	right: 0;
	top: 0;
	padding: 9px 21px;
	cursor: pointer;
`
const Edit = styled.div`
	padding: 32px 64px;
	background-color: var(--gray1);
	flex: 1;
`
const ButtonStep = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	text-decoration: none;
	border-radius: 4px;
	border: none;
	cursor: pointer;
	text-transform: uppercase;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	background-color: var(--brand);
	color: var(--text1);
	font-weight: 700;
	font-size: 21px;
	width: 100%;
	height: 52px;

	:hover {
		opacity: 0.95;
	}
`

const EditCard = (props) => {
	const [warningDisplay, setWarningDisplay] = useState(false);
	const [displayPopUp, showPopUp] = useState(false);
	const [newPlaylist, setNewPlaylist] = useState({
		new_title: props.title,
		new_desc: props.desc,
		new_privacy: props.privacy,
	});

	
	const editHandler = async () => {
		const accessToken = localStorage.getItem('SpotifyAuth');
		
		fetch(`https://api.spotify.com/v1/playlists/${props.playlistID}`, {
			method: 'PUT',
			body: JSON.stringify({
				'name': newPlaylist.new_title,
				'description': 'Created with pare-down.mtymon.me ' + newPlaylist.new_desc,
				'public': newPlaylist.new_privacy
			}),
			headers: {
				'Authorization': 'Bearer ' + accessToken
			}
		})
		.then((response) => {
			response.ok
			? PopUpHandler()
			: console.log('something went wrong')
		})

	}


	const PopUpHandler = () => {
		let e = document.getElementById('edit-card-wrapper');
		if(e.style.display === 'flex') {
			e.style.display = 'none';
		} else {
			props.showEdit(false);
			props.history.push('/dashboard');
		}

		showPopUp(!displayPopUp);
	}


	const WarningHandler = () => {
		setWarningDisplay(false);
	}
	

	return (
		<StyledEditCard>
			<GlobalStyle/>
			<Overlay/>

			<EditCardWrapper id='edit-card-wrapper' style={{display: 'flex'}}>
				<HeaderWrapper>
					<Header onClick={() => {
						setWarningDisplay(true);
					}}>
						<h1> <ArrowLeft size={24}/> Edit</h1>
					</Header>
					
					<HeaderDesc>
						Update playlist details
					</HeaderDesc>
					
					<HeaderClose onClick={() => setWarningDisplay(true)}>
						<X size={21}/>
					</HeaderClose>
				</HeaderWrapper>

				<Edit>
					<Step1
						newPlaylist={newPlaylist}
						setNewPlaylist={setNewPlaylist}
						title={props.title}
					/>
				</Edit>

				<ButtonStep onClick={() => {
					editHandler()
				}}>
					Edit Playlist
				</ButtonStep>
			</EditCardWrapper>

			{
				warningDisplay ? 
				<Warning
					bgColor='var(--text1)'
					color='var(--gray2)'
					fSize='14px'
					width='350px'
					height='208px'
					bColor='var(--gray3)'
					display='flex'
					header='Are you sure you want to exit?'
					text='Any data entered will be lost'
					setWarningDisplay={setWarningDisplay}
					no_action={WarningHandler}
					yes_action={props.yes_action}
				/>
				: null
			}

			{
				displayPopUp ?
					<PopUp 
						text='Playlist has been edited 🙂'
						hide={PopUpHandler}
					/>
				: null
			}
		</StyledEditCard>
	)
}
export default withRouter(EditCard);