import React, { Component } from 'react';
import { Plus, Minus } from 'react-feather';
import styled, { keyframes } from 'styled-components';


const qShow = keyframes`
	from {
		opacity: 0.3;
	}
	to {
		opacity: 1;
	}
`
const FaqCard = styled.div`
	cursor: pointer;
	margin-top: 36px;
	color: var(--text1);
	width: 720px;

	& > .active {
		display: block !important;
	}

	@media (max-width: 760px) {
		width: 92%
	}
`
const Question = styled.h3`
	display: flex;
	align-items: center;
	font-size: 21px;
	font-weight: 600;

	& > .faq-card-i {
		color: var(--brand);
		margin-right: 10px;
	}

	@media (max-width: 460px) {
		font-size: 17px;
		line-height: 1.1em;
	}
`
const Answer = styled.p`
	margin-top: 12px;
	margin-left: 36px;
	padding-left: 12px;
	font-size: 18px;
	line-height: 1.25em;
	border-left: 2px solid var(--brand);
	animation: ${qShow} 0.8s;
	display: none;

	@media (max-width: 460px) {
		font-size: 16px;
	}
`


export default class FAQ extends Component {
	constructor() {
		super()
		this.state = {
			action: 'none',
		}
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick() {
		let e = document.getElementsByClassName('faq-card-a');
		for(let i=0; i<e.length; i++){
			e[i].classList.remove('active');
		}

		const ID = this.props.id;
		document.getElementsByClassName('faq-card-a')[ID].classList.add('active');
	}


	render() {
		const Q = this.props.Q;
		const A = this.props.A;
		const ID = this.props.id;


		return (
			<FaqCard onClick={this.handleClick} id={'faq-'+ID}>
				<Question>
					{
						document.getElementsByClassName('faq-card-a')[ID] ?
							document.getElementsByClassName('faq-card-a')[ID].classList.contains('active')
							?
							<Minus className='faq-card-i' size={24}/>
							:
							<Plus className='faq-card-i' id='test' size={24}/>
						: 
						<Plus className='faq-card-i' id='test' size={24}/>	
					}
					{Q}
				</Question>

				<Answer className='faq-card-a'> {A} </Answer>
			</FaqCard>
		)
	}
}