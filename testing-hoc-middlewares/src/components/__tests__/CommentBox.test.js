import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root'; //to provide a redux store to this component
import CommentBox from '../CommentBox';

//we can  use shallow or mount in this test

let wrapper;
beforeEach(() => {
	wrapper = mount(
		<Root>
			<CommentBox />
		</Root>
	);
});

afterEach(() => {
	// this 'unmount' func to cleanup after each test
	// and its only used with the 'mount' func (not with shallow or render)
	wrapper.unmount();
});

it('has a textarea and 2 buttons ', () => {
	expect(wrapper.find('textarea').length).toEqual(1);
	expect(wrapper.find('button').length).toEqual(2);
});

describe('the text area', () => {
	beforeEach(() => {
		// the simulate func accepts two args
		// the first is the event name
		// and the second(optional) is an object that will be merged
		// with the real object that passed to that input (event object)
		wrapper.find('textarea').simulate('change', {
			target: { value: 'new comment' }
		});

		// to force the component to re-render
		wrapper.update();
	});

	it('has a textarea that users can type in', () => {
		const text = wrapper.find('textarea').prop('value');
		expect(text).toEqual('new comment');
	});

	it('gets emptied when the form is submitted', () => {
		wrapper.find('form').simulate('submit');
		wrapper.update();
		const text = wrapper.find('textarea').prop('value');
		expect(text).toEqual('');
	});
});
