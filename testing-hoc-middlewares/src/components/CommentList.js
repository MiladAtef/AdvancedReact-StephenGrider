import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
	renderComments = () => {
		return this.props.comments.map(c => <li key={c}>{c}</li>);
	};
	render() {
		return (
			<div>
				<h4>Comment List</h4>
				<ul>{this.renderComments()}</ul>
			</div>
		);
	}
}
const mapStateToProps = ({ comments }) => ({ comments });
export default connect(mapStateToProps)(CommentList);
