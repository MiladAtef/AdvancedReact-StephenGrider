import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import reduxPromise from 'redux-promise';
import asyncMiddleware from './middleware/async';
import stateValidator from './middleware/stateValidator';
import reducers from './reducers';

const Root = ({ initialState = {}, children }) => {
	const store = createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(asyncMiddleware, stateValidator))
	);
	return <Provider store={store}>{children}</Provider>;
};

export default Root;
