import React, { useState } from "react";
import styled from 'styled-components';
import { Globe } from 'react-feather';


const StyledStep3 = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`
const SelectedPlaylist = styled.div`
	background-color: var(--gray2);
	margin-bottom: 32px;
	padding: 14px 12px;

	& > h1 {
		font-size: 18px;
		font-weight: 600;
		color: var(--text1);
		margin-bottom: 6px;
		letter-spacing: 0.75px;
	}

	& > div > img {
		width: 96px;
		height: 96px
	}

	& > div > ul {
		margin-left: 10px;

		& > li:first-of-type {
			font-size: 16px;
			color: var(--text1);
			letter-spacing: 0.5px;
		}

		& > li {
			color: var(--text2);
			line-height: 1.05em;
		}

		ul {
			margin-top: 16px;
			display: flex;

			& > li:first-of-type {
				margin-right: 6px;
				padding-right: 6px;
				border-right: 1px solid var(--text2);
			}

			svg {
				color: var(--brand);
				margin-right: 4px;
			}
		}
	}
`
const ParedPlaylist = styled.div`
	background-color: var(--gray2);
	padding: 14px 12px;

	& > h1 {
		font-size: 18px;
		font-weight: 600;
		color: var(--text1);
		margin-bottom: 6px;
		letter-spacing: 0.75px;
	}
`
const CoverDiv = styled.div`
	display: grid;
	grid-template-columns: 48px 48px;
	grid-template-rows: 48px 48px;
	margin-right: 10px;

	& > img {
		width: 100%;
		height: 100%;
	}
`
const ListWrapper = styled.div`
	& > ul > li:first-of-type {
		font-size: 16px;
		color: var(--text1);
		letter-spacing: 0.5px;
	}

	& > ul > li {
		color: var(--text2);
		line-height: 1.05em;
	}

	& > ul > li > ul {
		margin-top: 16px;
		display: flex;

		& > li:first-of-type {
			margin-right: 6px;
			padding-right: 6px;
			border-right: 1px solid var(--text2);
		}

		svg {
			color: var(--brand);
			margin-right: 4px;
		}
	}
`


const Step3 = (props) => {
	const pd = props.newPlaylist;


	return (
		<StyledStep3>
			<SelectedPlaylist>
				<h1>SELECTED PLAYLIST:</h1>
				
				<div style={{display: 'flex'}}>
					<img src={props.cover}/>
					<ul>
						<li>{props.title}</li>
						<li>{props.desc}</li>
						<li>
							<ul>
								<li>{props.tracks_total} tracks</li>
								<li>
									<Globe size={14}/>
									{
									props.privacy
									? 'Public'
									: 'Private'
									}
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</SelectedPlaylist>

			<ParedPlaylist>
				<h1>PARED DOWN PLAYLIST:</h1>

				<ListWrapper style={{display: 'flex'}}>
					<CoverDiv>
						<img src={props.coverTile[0]}/>
						<img src={props.coverTile[1]}/>
						<img src={props.coverTile[2]}/>
						<img src={props.coverTile[3]}/>
					</CoverDiv>
					<ul>
						<li>{pd.new_title}</li>
						<li>{pd.new_desc}</li>
						<li>
							<ul>
								<li>{pd.new_num_tracks} tracks</li>
								<li>
									<Globe size={14}/>
									{
									pd.new_privacy
									? 'Public'
									: 'Private'
									}
								</li>
							</ul>
						</li>
					</ul>
				</ListWrapper>
			</ParedPlaylist>
		</StyledStep3>
	)
}
export default Step3;