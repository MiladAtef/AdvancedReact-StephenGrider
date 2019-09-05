import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import * as actions from '../actions';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

class App extends Component {
	renderButton = () => {
		if (this.props.auth) {
			return (
				<button onClick={() => this.props.changeAuth(false)}>Sign out</button>
			);
		} else {
			return (
				<button onClick={() => this.props.changeAuth(true)}>Sign in</button>
			);
		}
	};

	renderHeader = () => (
		<ul>
			<li>
				<Link to="/">Home</Link>
			</li>
			<li>
				<Link to="/post">Post a Comment</Link>
			</li>
			<li>{this.renderButton()}</li>
		</ul>
	);
	render() {
		return (
			<Router history={history}>
				<React.Fragment>
					{this.renderHeader()}
					<Route path="/" exact component={CommentList} />
					<Route path="/post" exact component={CommentBox} />
				</React.Fragment>
			</Router>
		);
	}
}

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(
	mapStateToProps,
	actions
)(App);
