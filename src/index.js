import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'mobx';
import { Provider } from 'mobx-react';
import promiseFinally from 'promise.prototype.finally';
import App from './App';
import * as serviceWorker from './serviceWorker';

import 'antd/dist/antd.less';
import './index.css';

import stores from './store';

// for easier debugging
window.__APP_STATE__ = stores;

promiseFinally.shim();

// 开启严格模式,只能通过action改变state
configure({
	enforceActions: 'always',
});

ReactDOM.render(
	<Provider {...stores}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
