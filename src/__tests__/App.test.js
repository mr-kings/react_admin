import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import stores from '../store';
import App from '../App';

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(
		<Provider {...stores}>
			<App />
		</Provider>,
		div
	);
	ReactDOM.unmountComponentAtNode(div);
});
