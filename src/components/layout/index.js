import React, { Component } from 'react';
import { Layout } from 'antd';
import Routes from '@/routes/index';
import CustomHeader from '../header/index';
import CustomSide from '../siderBar/index';
import CustomBreadcrumb from '../breadcrumb/index';

import './index.css';

const { Content, Footer } = Layout;
/**
 * 页面布局组件
 * @author kim
 * @date 2019-4-14
 * @class LayoutComponent
 * @extends {Component}
 */
class LayoutComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			title: '',
		};
	}

	// 展开收起
	onCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	// 设置title
	setTitle = title => {
		if (this.state.title === title) return;
		this.setState({
			title: title,
		});
	};

	// 路由切换回调
	onRouterChange = route => {
		//this.setTitle(route.title);
	};

	render() {
		const { collapsed, title } = this.state;
		return (
			<Layout className="layoutWrap">
				<CustomSide collapsed={collapsed} />
				<Layout>
					<CustomHeader toggle={this.onCollapse} collapsed={collapsed} />
					<Content className="contentWrap">
						<CustomBreadcrumb first={title} />
						<div className="contentBox">
							<Routes onRouterChange={this.onRouterChange} />
						</div>
					</Content>
					<Footer className="footerWrap">
						React Admin© 2019 Created by kim
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default LayoutComponent;
