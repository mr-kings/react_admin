import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import routes from '@/routes/config';
import SiderMenu from './sideMenu';

const { Sider } = Layout;

/**
 * 自定义左侧菜单
 * @author kim
 * @date 2019-4-14
 * @class SiderCustom
 * @extends {Component}
 */
class SiderCustom extends Component {
	// state、props更新触发 不仅 render 时会被调用，setState 时也会被触发 会在每次re-rendering之前被调用
	static getDerivedStateFromProps(props, state) {
		// 当点击收缩展开时触发
		if (props.collapsed !== state.collapsed) {
			// 设置菜单的展开与收缩
			const state1 = SiderCustom.setMenuOpen(props);
			// 更新左侧导航的收缩展开及样式切换
			const state2 = SiderCustom.onCollapse(props.collapsed);
			return {
				...state1,
				...state2,
				firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
				openKey: state.openKey || (!props.collapsed && state1.openKey),
			};
		}
		return null;
	}

	// 根据路由设置菜单打开
	static setMenuOpen = props => {
		const { pathname } = props.location;
		return {
			openKey: pathname.substr(0, pathname.lastIndexOf('/')),
			selectedKey: pathname,
		};
	};

	// 左侧导航展开收起
	static onCollapse = collapsed => {
		return {
			collapsed,
			firstHide: collapsed,
			mode: collapsed ? 'vertical' : 'inline',
		};
	};

	// 构造函数
	constructor(props) {
		super(props);
		this.state = {
			collapsed: false,
			mode: 'inline',
			openKey: '',
			selectedKey: '',
			firstHide: false, // 默认展开选中的子菜单，openMenu时恢复
		};
	}

	// 组件挂载成功
	componentDidMount() {
		const state = SiderCustom.setMenuOpen(this.props);
		this.setState(state);
	}

	// 点击菜单
	menuClick = e => {
		const { openKey } = this.state;
		this.setState({
			selectedKey: e.key,
			firstHide: e.key.indexOf(openKey) !== -1 ? false : true, // 如果当前key包含展开的父菜单，说明是同级子节点，不隐藏父节点
		});
	};

	// 展开子菜单
	openMenu = v => {
		this.setState({
			openKey: v[v.length - 1],
			firstHide: false,
		});
	};

	render() {
		const { openKey, selectedKey, firstHide, mode } = this.state;
		const logoStyle = {
			height: '32px',
			background: 'rgba(255, 255, 255, 0.2)',
			margin: '16px',
		};
		return (
			<Sider
				breakpoint="lg"
				collapsible
				collapsed={this.props.collapsed}
				trigger={null}
				style={{
					overflowY: 'auto',
				}}
			>
				<div className="logo" style={logoStyle} />
				<SiderMenu
					menus={routes.menus}
					theme="dark"
					onClick={this.menuClick}
					mode={mode}
					selectedKeys={[selectedKey]}
					openKeys={firstHide ? null : [openKey]}
					onOpenChange={this.openMenu}
				/>
			</Sider>
		);
	}
}

export default withRouter(SiderCustom);
