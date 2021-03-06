import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

export default ChildComponent => {
	class ComposedComponent extends Component {
		// Our component just got rendered
		componentDidMount() {
			this.shouldNavigateAway();
		}

		// Our component just got updated
		componentDidUpdate() {
			this.shouldNavigateAway();
		}

		shouldNavigateAway() {
			if (!this.props.auth) {
				history.push('/');
			}
		}

		render() {
			return <ChildComponent {...this.props} />;
		}
	}

	const mapStateToProps = ({ auth }) => ({ auth: auth.authenticated });

	return connect(mapStateToProps)(ComposedComponent);
};
