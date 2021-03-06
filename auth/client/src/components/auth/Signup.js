import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
	onSubmit = formValues => {
		this.props.signup(formValues);
	};

	render() {
		const { handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>
				<fieldset>
					<label>Email</label>
					<Field
						name="email"
						type="email"
						component="input"
						autoComplete="off"
					/>
				</fieldset>
				<fieldset>
					<label>password</label>
					<Field
						name="password"
						type="password"
						component="input"
						autoComplete="off"
					/>
				</fieldset>
				<div>{this.props.errorMessage}</div>
				<button>Sign up</button>
			</form>
		);
	}
}

const mapStateToProps = ({ auth }) => ({ errorMessage: auth.errorMessage });

export default compose(
	connect(
		mapStateToProps,
		actions
	),
	reduxForm({ form: 'signup' })
)(Signup);
