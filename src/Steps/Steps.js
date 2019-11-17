import React, {Component} from 'react';
import './Steps.css';

//component to display proper message for current state
export default class Steps extends Component {
    render() {
        if (this.props.step === 1) {
            return (
                <h3 className="step--header">{this.props.step}. Select which playlist you would like to pare down: </h3>
            )
        } else if (this.props.step === 2) {
            return (
                <h3 className="step--header">{this.props.step}. Personalize playlist that will be created by pare down process: </h3>
            )
        } else if (this.props.step === 3) {
            return (
                <h3 className="step--header">{this.props.step}. Preview your pare down process: </h3>
            )
        } else {
            return null;
        }
    }
}