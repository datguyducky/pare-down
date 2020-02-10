import React, { Component } from 'react';
import { Plus, Minus } from 'react-feather';

import './styles/FAQ.css';


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
			<div className='faq-card' onClick={this.handleClick} id={ID}>
				<h3 className='faq-card-head'>
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
				</h3>
				<p style={{display: 'none'}} className='faq-card-a'>
					{A}
				</p>
			</div>
		)
	}
}