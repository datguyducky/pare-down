import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import PlaylistCard from './dashboard/PlaylistCard';

import * as serviceWorker from './serviceWorker';


const routing = (
	<Router basename={process.env.PUBLIC_URL}>
		<Route exact path={process.env.PUBLIC_URL + '/'} component={Home} />
		<Route exact path={process.env.PUBLIC_URL + '/dashboard'} component={Dashboard} />
		<Route path={process.env.PUBLIC_URL + '/dashboard/playlist-:uuid'} component={PlaylistCard}/>
	</Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();