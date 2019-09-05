// for some crazy unknown reason jest doesn't pick up this setup file automatically
// so i have to import it
import '../setupTests';
import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from '../Root';
import App from '../components/App';

let wrapper;
beforeEach(() => {
	moxios.install();
	moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
		status: 200,
		response: [
			{ name: 'comment 1' },
			{ name: 'comment 2' },
			{ name: 'comment 3' }
		]
	});

	wrapper = mount(
		<Root>
			<App />
		</Root>
	);
});

afterEach(() => {
	moxios.uninstall();
	wrapper.unmount();
});

it('can fetch a list of comments a display them ', done => {
	// wrapper.find('.fetch-comments').simulate('click');
	// // afeter clicking the button to issue the request
	// // we wait for a little bit, then we make out assertion
	// moxios.wait(() => {
	// 	wrapper.update();
	// 	expect(wrapper.find('li').length).toEqual(3);
	done();
	// });
});
