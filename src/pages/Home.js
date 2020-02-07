import React, { Component } from 'react';
import './styles/Home.css'
import '../utils/colors.css';

import { Header } from '../components';


export default class Home extends Component {
    render() {
		return (
			<div className="appWrapper">
            	<Header/>
			</div>
        );
    }
}