import React, {Component} from 'react';
import './Header.css';

export default class Result extends Component {
    render() {
        return (
            <div>
				<h1 className="app-name">
					Pare Down for Spotify
				</h1>
				<h2 className="app-name__sub">
					Create copy of your playlist pared down to number of songs you have chosen to.
				</h2>
			</div>
        )
    }
}