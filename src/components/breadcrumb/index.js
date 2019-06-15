import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
// import { Link } from 'react-router-dom';

/**
 * @author kim
 * @date 2019-5-6
 * @description 自定义面包屑
 * @class BreadcrumbCustom
 * @extends {Component}
 */
class BreadcrumbCustom extends Component {
	render() {
		const first = <Breadcrumb.Item> {this.props.first} </Breadcrumb.Item> || '';
		const second =
			<Breadcrumb.Item> {this.props.second} </Breadcrumb.Item> || '';
		return (
			<Breadcrumb
				style={{
					margin: '12px 0',
				}}
			>
				{/* <Link to={'/app/dashboard/index'}>首页</Link> */}
				<Breadcrumb.Item>
					<Icon
						type="home"
						style={{
							marginRight: 6,
						}}
					/>
					首页
				</Breadcrumb.Item>
				{first} {second}
			</Breadcrumb>
		);
	}
}

export default BreadcrumbCustom;
