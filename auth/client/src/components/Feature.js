import React, { Component } from 'react';
import requireAuth from './requireAuth';

class Feature extends Component {
	render() {
		return (
			<div>
				<div>Feature</div>
			</div>
		);
	}
}

export default requireAuth(Feature);
