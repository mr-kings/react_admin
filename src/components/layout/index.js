/*
 * @Author: kim
 * @Date: 2019-06-16 00:38:15
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 13:53:46
 * @Description: 页面布局组件
 */
import React, { Component } from 'react';
import { Layout } from 'antd';
import { inject, observer } from 'mobx-react';
import CustomHeader from '../header/index';
import CustomSide from '../siderBar/index';
import CustomBreadcrumb from '../breadcrumb/index';
import Routes from '@/routes/index';

import styles from './index.module.less';

const { Content, Footer } = Layout;

@inject('breadcrumbStore')
@observer
class LayoutComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
		};
	}

	// 展开收起
	onCollapse = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	// 路由切换回调
	onRouterChange = route => {
		if (route.parent) {
			this.props.breadcrumbStore.setFirstBread(route.parent);
			this.props.breadcrumbStore.setSecondBread(route);
		} else if (route.key !== '/app/index') {
			this.props.breadcrumbStore.setFirstBread(route);
			this.props.breadcrumbStore.setSecondBread('');
		} else {
			this.props.breadcrumbStore.setFirstBread('');
			this.props.breadcrumbStore.setSecondBread('');
		}
	};

	render() {
		const { collapsed } = this.state;
		return (
			<Layout className={styles.layoutWrap}>
				<CustomSide collapsed={collapsed} />
				<Layout>
					<CustomHeader toggle={this.onCollapse} collapsed={collapsed} />
					<Content className={styles.contentWrap}>
						<div className={styles.breadcrumbWrap}>
							<CustomBreadcrumb />
						</div>
						<div className={styles.contentBox}>
							<Routes onRouterChange={this.onRouterChange} />
						</div>
					</Content>
					<Footer className={styles.footerWrap}>
						React Admin© 2019 Created by kim
					</Footer>
				</Layout>
			</Layout>
		);
	}
}

export default LayoutComponent;
