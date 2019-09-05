export default ({ dispatch }) => next => action => {
	// check to see if the action has a payload
	// and the payload has a promise
	// if it does, wait for it to resolve
	// if it doesn't, then send the action to the next middleware
	if (!action.payload || !action.payload.then) {
		return next(action);
	}

	// we wait for the promise to resolve
	// (get its data) and then create new action
	//  with that data and dispatch it
	action.payload.then(res => {
		const newAction = { ...action, payload: res };
		dispatch(newAction);
	});
};
