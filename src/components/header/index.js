/*
 * @Author: kim
 * @Date: 2019-06-16 00:46:01
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:07:10
 * @Description: 头部导航
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import screenfull from 'screenfull';
import avater from '@/assets/imgs/avater.png';
import { Menu, Icon, Layout } from 'antd';
import ThemeColorPicker from '../header-color-picker/index';
import cx from 'classnames';
import styles from './index.module.less';
const { Header } = Layout;
const { SubMenu } = Menu;
const MenuItemGroup = Menu.ItemGroup;

@inject('systemStore')
@observer
class CustomHeader extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	// 全屏操作
	screenFull = () => {
		if (screenfull.enabled) {
			screenfull.request();
		}
	};

	// 切换语言
	onHandleLocal = ({ item, key }) => {
		this.props.systemStore.setCurrentLocal(key);
	};

	render() {
		const { currentLocal } = this.props.systemStore;
		return (
			<div className={styles.headerWrap}>
				<Header className={styles.customHeader}>
					<Icon
						className={styles.headerTrigger}
						type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={this.props.toggle}
					/>
					<Menu mode="horizontal" theme="dark" className={styles.headerMenu}>
						<Menu.Item key="full" onClick={this.screenFull}>
							<Icon
								className={styles.headerIcon}
								type="fullscreen"
								onClick={this.screenFull}
							/>
						</Menu.Item>
						<Menu.Item key="color" className={styles.headerColorPicker}>
							<ThemeColorPicker />
						</Menu.Item>
						<SubMenu
							title={
								<span className={styles.headerI18n}>{currentLocal.label}</span>
							}
							onClick={this.onHandleLocal}
						>
							<Menu.Item key="zh-cn">简体中文</Menu.Item>
							<Menu.Item key="en-gb">English</Menu.Item>
						</SubMenu>

						<SubMenu
							title={
								<span className={styles.avatar}>
									<img src={avater} alt="头像" />
									<i className={cx(styles.on, styles.bottom)} />
								</span>
							}
						>
							<MenuItemGroup title="用户中心">
								<Menu.Item key="setting:2"> 个人信息 </Menu.Item>
								<Menu.Item key="logout">
									<span onClick={this.logout}> 退出登录 </span>
								</Menu.Item>
							</MenuItemGroup>
							<MenuItemGroup title="设置中心">
								<Menu.Item key="setting:3"> 个人设置 </Menu.Item>
								<Menu.Item key="setting:4"> 系统设置 </Menu.Item>
							</MenuItemGroup>
						</SubMenu>
					</Menu>
				</Header>
			</div>
		);
	}
}
export default CustomHeader;
