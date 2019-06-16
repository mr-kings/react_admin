import React, { Component } from 'react';
import I18nLocal from './i18n/index';
import AppRouter from './routes/appRouter';
import './App.css';

class App extends Component {
	render() {
		return (
			<I18nLocal>
				<AppRouter />
			</I18nLocal>
		);
	}
}

export default App;
