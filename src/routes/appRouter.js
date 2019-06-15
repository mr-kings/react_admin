import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '@/components/layout/index';
import AllComponents from '../views/index';

class AppRouter extends Component {
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route
						exact
						path="/"
						render={() => <Redirect to="/app/index" push />}
					/>
					<Route path="/app" component={Layout} />
					<Route exact path="/401" component={AllComponents.notPermission} />
					{/* <Route path="/login" component={Login} /> */}
					<Route component={AllComponents.notFound} />
				</Switch>
			</HashRouter>
		);
	}
}

export default AppRouter;
