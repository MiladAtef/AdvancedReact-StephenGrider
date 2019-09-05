import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';
import history from '../history';

export const signup = formValues => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/signup', formValues);
		dispatch({ type: AUTH_USER, payload: res.data.token });
		localStorage.setItem('token', res.data.token);
		history.push('/feature');
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: 'Email is in use' });
	}
};

export const signin = formValues => async dispatch => {
	try {
		const res = await axios.post('http://localhost:5000/signin', formValues);
		dispatch({ type: AUTH_USER, payload: res.data.token });
		localStorage.setItem('token', res.data.token);
		history.push('/feature');
	} catch (err) {
		dispatch({ type: AUTH_ERROR, payload: 'Invalid email or password' });
	}
};

export const signout = () => {
	localStorage.removeItem('token');
	return {
		type: AUTH_USER,
		payload: ''
	};
};
