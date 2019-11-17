import React, {Component} from 'react';
import './Footer.css';

export default class Footer extends Component {
    render() {
        return (
            <div className="footer">
				<p>
					Made with <span style={{color: 'red'}}>❤️</span> by
					<a href="https://github.com/datguysheepy/pare-down"> @datguysheepy</a>
				</p>
			</div>
        )
    }
}