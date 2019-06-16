/*
 * @Author: kim
 * @Date: 2019-06-16 16:46:13
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:46:47
 * @Description: 路由跳转
 */
import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Layout from '@/components/layout';
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
					<Route component={AllComponents.notFound} />
				</Switch>
			</HashRouter>
		);
	}
}

export default AppRouter;
