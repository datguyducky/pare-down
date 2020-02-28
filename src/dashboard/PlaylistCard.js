import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import DashboardNav from './DashboardNav';


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


export default class PlaylistCard extends Component {
	render() {
		return (
			<StyledPlaylistCard>
				<GlobalStyle />
				<DashboardNav />
				
				
			</StyledPlaylistCard>
		)
	}
}