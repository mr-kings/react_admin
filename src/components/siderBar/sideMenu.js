import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

class SiderMenu extends Component {
	render() {
		const { menus, ...props } = this.props;

		const setMenuItem = item => (
			<Menu.Item key={item.key}>
				<Link to={(item.route || item.key) + (item.query || '')}>
					{item.icon && <Icon type={item.icon} />}
					<span className="nav-text"> {item.title} </span>
				</Link>
			</Menu.Item>
		);

		const setSubMenu = item => (
			<Menu.SubMenu
				key={item.key}
				title={
					<span>
						{item.icon && <Icon type={item.icon} />}
						<span className="nav-text"> {item.title} </span>
					</span>
				}
			>
				{item.subs.map(item => setMenuItem(item))}
			</Menu.SubMenu>
		);

		return (
			<Menu {...props}>
				{menus &&
					menus.map(item => (item.subs ? setSubMenu(item) : setMenuItem(item)))}
			</Menu>
		);
	}
}

export default SiderMenu;
