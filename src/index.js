import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';

import * as serviceWorker from './serviceWorker';


const routing = (
	<Router>
		<Route exact path="/" component={Home} />
		<Route path='/dashboard' component={Dashboard} />
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();