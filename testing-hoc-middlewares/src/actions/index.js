import axios from 'axios';
import { SAVE_COMMENT, FETCH_COMMENTS, CHANGE_AUTH } from './types';

export const saveComment = comment => ({
	type: SAVE_COMMENT,
	payload: comment
});

export const fetchComments = () => {
	const res = axios.get('http://jsonplaceholder.typicode.com/comments');
	return {
		type: FETCH_COMMENTS,
		payload: res
	};
};

export const changeAuth = isLoggedIn => ({
	type: CHANGE_AUTH,
	payload: isLoggedIn
});
