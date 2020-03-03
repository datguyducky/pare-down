import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { ArrowLeft, X, Check } from 'react-feather';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Warning } from "../components";


const GlobalStyle = createGlobalStyle`
 	body {
		overflow: hidden;
	}
`
const StyledStepCard = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	display: ${props => props.display};
`
const Overlay = styled.div`
	position: absolute;
	background-color: var(--gray3);
	opacity: 0.8;
	width: 100%;
	height: 100%;
	z-index: 10;
`
const StepCardWrapper = styled.div`
	z-index: 100;
	background-color: var(--gray2);
	height: 760px;
	width: 620px;
	box-shadow: 0 0 12px 0 rgba(0, 0, 0, 0.4);
	border-radius: 4px;
	border: 1px solid var(--gray3);
	position: relative;
	display: flex;
	flex-direction: column;
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
	padding-bottom: 42px;
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
const StepsWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: -12px;
	margin-bottom: 16px;
`
const StepIcon = styled.ul`
	display: flex;
	margin-bottom: 24px;
`
const rotateSpinner = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`
const doneScale = keyframes`
	from {
		transform: scale(1.5);
	}
	to {
		transform: scaleY(1);
	}
`
const IconSpinner = styled.li`
	margin-right: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 23px;
	width: 23px;
	border-radius: 24px;
	border: 1px solid var(--gray3);
	background-color: var(--gray2);
	position: relative;
	cursor: default;

	:last-of-type {
		margin-right: 0;
	}

	&.active-step {
		background-color: var(--brand);
	}

	&.done {
		background-color: #1ed760;
		animation-name: ${doneScale};
		animation-duration: 0.6s;
	}

	&.active-step > div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 25px;
		height: 25px;
		border: 2px solid transparent;
		border-left-color: var(--text1);
		border-radius: 100%;
		animation-name: ${rotateSpinner};
		animation-iteration-count: infinite;
		animation-duration: 2s;
		animation-timing-function: linear;
		position: absolute;
	}

	&.done > div {
		display: none;
	}

	&.redo > div {
		display: flex;
	}
`
const Step = styled.h2`
	font-size: 21px;
	font-weight: 600;
	color: var(--text1);

	& > span {
		color: var(--brand);
	}
`
const ActiveStep = styled.div`
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

const PareDownCard = (props) => {
	const [currentStep, setStep] = useState(2);
	const [warningDisplay, setWarningDisplay] = useState(false);
	const [newPlaylist, setNewPlaylist] = useState({
		new_title: '',
		new_desc: '',
		new_privacy: true,
		new_num_tracks: 0,
		new_order: false
	});
	const [coverTile, setCoverTile] = useState([]);


	const StepBtnHandler = () => {
		if(currentStep === 1 && newPlaylist.new_title.length === 0) {
			return false;
		}


		if(
			currentStep === 2 
			&& typeof newPlaylist.new_num_tracks === 'number'
			&& newPlaylist.new_num_tracks <= 0
		) {
			return false;
		}


		if(currentStep < 3) {
			setStep(currentStep + 1)


			const oldStepIcon = document.querySelector('#step-icons').childNodes[currentStep - 1];
			oldStepIcon.classList.add('done'); 
			if(oldStepIcon.classList.contains('redo')) {
				oldStepIcon.classList.remove('redo');
			}


			const nextStepIcon = document.querySelector('#step-icons').childNodes[currentStep];
			nextStepIcon.classList.add('active-step'); 
			
		} else {
			console.log('end')
		}
	}

	const HeaderHandler = () => {
		if(currentStep > 1 && currentStep <= 3) {
			setStep(currentStep - 1) 
		

			const oldStepIcon = document.querySelector('#step-icons').childNodes[currentStep - 1];
			oldStepIcon.classList.remove('active-step');
			

			const redoStepIcon = document.querySelector('#step-icons').childNodes[currentStep - 2];
			redoStepIcon.classList.add('redo');

		} else {
			setWarningDisplay(true);
		}
	}

	const WarningHandler = () => {
		setWarningDisplay(false);
	}
	
	const StepList = [
		'Configure your playlist',
		'Tracklist configuration',
		'Confirm pare down'
	]
	const StepBtnList = [
		'save configuration',
		'confirm tracklist',
		'pare down'
	]


	return (
		<StyledStepCard display={props.displaySteps}>
			<GlobalStyle/>
			<Overlay/>

			<StepCardWrapper>
				<HeaderWrapper>
					<Header onClick={HeaderHandler}>
						<h1> <ArrowLeft size={24}/> Pare Down </h1>
					</Header>
					
					<HeaderDesc>
						Duplicate your playlist with pared number of songs
					</HeaderDesc>
					
					<HeaderClose onClick={() => setWarningDisplay(true)}>
						<X size={21}/>
					</HeaderClose>
				</HeaderWrapper>

				<StepsWrapper>
					<StepIcon id='step-icons'>
						<IconSpinner className='active-step'>
							{	
								document.querySelector('#step-icons')
								? document.querySelector('#step-icons').childNodes[0].classList.contains('done')
									? <Check size={16}/>
									: '1'
								: '1'
							}
							<div/>
						</IconSpinner>
						<IconSpinner>
							{
								document.querySelector('#step-icons')
								? document.querySelector('#step-icons').childNodes[1].classList.contains('done')
									? <Check size={16}/>
									: '2'
								: '2'
							}
							<div/>
						</IconSpinner>
						<IconSpinner>
							{
								document.querySelector('#step-icons')
								? document.querySelector('#step-icons').childNodes[2].classList.contains('done')
									? <Check size={16}/>
									: '3'
								: '3'
							}
							<div/>
						</IconSpinner>
					</StepIcon>

					<Step>
						<span>STEP {currentStep}: </span> 
						{StepList[currentStep-1]}
					</Step>
				</StepsWrapper>

				<ActiveStep>
					{
						currentStep === 1 ? 
							<Step1 
								newPlaylist={newPlaylist}
								setNewPlaylist={setNewPlaylist}
								title={props.title}
							/>
						: currentStep === 2 ? 
							<Step2 
								playlistID={props.playlistID}
								tracks_total={props.tracks_total}
								newPlaylist={newPlaylist}
								setNewPlaylist={setNewPlaylist}
								coverTile={coverTile}
								setCoverTile={setCoverTile}
							/>
						: currentStep === 3 ? 
							<Step3
								newPlaylist={newPlaylist}
								desc={props.desc}
								title={props.title}
								tracks_total={props.tracks_total}
								privacy={props.privacy}
								cover={props.cover}
								coverTile={coverTile}
							/>
						: null
					}
				</ActiveStep>

				<ButtonStep onClick={StepBtnHandler}>
					{StepBtnList[currentStep-1]}
				</ButtonStep>
			</StepCardWrapper>

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
					text='Any data entered will be lost'
					setWarningDisplay={setWarningDisplay}
					no_action={WarningHandler}
					yes_action={props.yes_action}
				/>
				: null
			}
		</StyledStepCard>
	)
}
export default PareDownCard;