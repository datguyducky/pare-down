import React, {Component} from 'react';
import './Footer.css';

export default class Footer extends Component {
	render() {
		return (
			<div className="footer">
				<p>
					<span>Copyright &copy; {new Date().getFullYear()} || </span>
					<a href="https://github.com/datguysheepy/pare-down"> Github: datguysheepy</a>
				</p>
			</div>
		)
	}
}