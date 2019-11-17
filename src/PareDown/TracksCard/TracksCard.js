import React, {Component} from 'react';

export default class TracksCard extends Component {
	//without this component re-renders itself on input value change (after sort-button was clicked)
	//so don't delete it :)
    shouldComponentUpdate(nextProps) {
        if (this.props.iValue !== nextProps.iValue) {
            return false
        }
        return true
    }

    render() {
        return (
            <div>
				{/* Track Number (1-100) : Track Title*/}
				<p>{this.props.num + 1}. <span style={{opacity: '0.6'}}>{this.props.track.name}.</span></p>
			</div>
        )
    }
}