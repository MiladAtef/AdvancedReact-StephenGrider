import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';

export default WrappedComponent => {
	class RequireAuth extends Component {
		componentDidMount() {
			this.shouldNavigateAway();
		}

		componentDidUpdate() {
			this.shouldNavigateAway();
		}

		shouldNavigateAway = () => {
			if (!this.props.auth) {
				history.push('/');
			}
		};

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	const mapStateToProps = ({ auth }) => ({ auth });
	return connect(mapStateToProps)(RequireAuth);
};
