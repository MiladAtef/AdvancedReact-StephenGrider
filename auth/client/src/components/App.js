import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';

import history from '../history';
import Header from './Header';
import Welcome from './Welcome';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Feature from './Feature';

class App extends Component {
	render() {
		return (
			<div>
				<Router history={history}>
					<React.Fragment>
						<Header />
						<Route path="/" exact component={Welcome} />
						<Route path="/signup" component={Signup} />
						<Route path="/signin" component={Signin} />
						<Route path="/feature" component={Feature} />
						<Route path="/signout" component={Signout} />
					</React.Fragment>
				</Router>
			</div>
		);
	}
}

export default App;
