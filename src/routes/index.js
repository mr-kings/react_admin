/*
 * @Author: kim
 * @Date: 2019-06-16 16:47:25
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:48:05
 * @Description: 根据路由配置文件生成菜单路由
 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import AllComponents from '../views/index';
import routesConfig from './config';
import queryString from 'query-string';

class CustomRouter extends Component {
	onRouterChange = route => {
		this.props.onRouterChange(route);
	};
	render() {
		return (
			<Switch>
				{Object.keys(routesConfig).map(key =>
					routesConfig[key].map(r => {
						const route = r => {
							const Component = AllComponents[r.component];
							return (
								<Route
									key={r.route || r.key}
									exact
									path={r.route || r.key}
									render={props => {
										const reg = /\?\S*/g;
										// 匹配?及其以后字符串
										const queryParams = window.location.hash.match(reg);
										// 去除?的参数
										const { params } = props.match;
										Object.keys(params).forEach(key => {
											params[key] = params[key] && params[key].replace(reg, '');
										});
										props.match.params = {
											...params,
										};
										const merge = {
											...props,
											query: queryParams
												? queryString.parse(queryParams[0])
												: {},
										};
										// 回传route配置
										this.onRouterChange(r);
										// 这里还需做权限校验
										return <Component {...merge} />;
									}}
								/>
							);
						};
						return r.component ? route(r) : r.subs.map(r => route(r));
					})
				)}
				<Route render={() => <Redirect to="/404" />} />
			</Switch>
		);
	}
}

export default CustomRouter;
