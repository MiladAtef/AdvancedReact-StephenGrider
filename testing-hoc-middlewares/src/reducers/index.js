import { combineReducers } from 'redux';
import comments from './comments';
import auth from './auth';

export default combineReducers({ comments, auth });
