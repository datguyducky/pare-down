import React, { Component } from 'react';
import { BrandSmall, PlatformIcon } from '../components';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const spotify = require('../assets/spotify.png');
const apple_music = require('../assets/apple_music.png');


const Nav = styled.nav`
	background-color: var(--gray2);
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100vh;
	border-right: 2px solid var(--gray3);
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.32);

	& > ul {
		margin-top: 92px;
		position: fixed;
		
		li {
		margin-top: 18px;
		position: relative;
		cursor: pointer;

			&#p-disabled {
				opacity: 0.4;
				cursor: not-allowed;

				span {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 700;
					color: var(--gray3);
					text-align: center;
					font-size: 16px;
				}
			}
		}
	}
`
const NavHeader = styled.header`
	padding: 18px 0;
	width: 94px;
	text-align: center;
	border-bottom: 1px solid var(--gray3);
	position:fixed;
	top: 0;
`
const StyledLink = styled(Link)`
	:hover {
		opacity: 0.8;
	}
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


export default class DashboardNav extends Component {
	constructor() {
		super()
		this.state = {
			SpotifyAuth: '',
			AppleAuth: '',
			filterString: '',
		}

		this.platformSync = this.platformSync.bind(this);
	}


	platformSync() {
		window.location = window.location.href.includes('localhost') 
		? 'http://localhost:8888/login' 
		: 'http://pare-down-backend.mtymon.me/login'
	}


	render() {
		const SpotifyAuth = this.state.SpotifyAuth;
		const AppleAuth = this.state.AppleAuth;


		return (
			<Nav>
				<NavHeader>
					<StyledLink to='/'>
						<BrandSmall/>
					</StyledLink>
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
						
					<li id='p-disabled'>
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
						<span>COMING SOON</span>
					</li>
				</ul>
			</Nav>
		)
	}
}