/*
 * @Author: kim
 * @Date: 2019-06-16 00:32:11
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 00:37:02
 * @Description: 自定义面包屑导航
 */
import React, { Component } from 'react';
import { Breadcrumb, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
@inject('breadcrumbStore')
@observer
class BreadcrumbCustom extends Component {
	render() {
		const { firstBread, secondBread } = this.props.breadcrumbStore;
		const hasFirst = firstBread.url ? true : false;
		const hasSecond = secondBread.url ? true : false;
		return (
			<Breadcrumb>
				<Breadcrumb.Item href="#/app/index">
					<Icon type="home" />
					<span>首页</span>
				</Breadcrumb.Item>
				{hasFirst && hasSecond && (
					<Breadcrumb.Item href={'#' + firstBread.url}>
						<span>{firstBread.title}</span>
					</Breadcrumb.Item>
				)}
				{hasFirst && hasSecond && (
					<Breadcrumb.Item>{secondBread.title}</Breadcrumb.Item>
				)}
				{hasFirst && !hasSecond ? (
					<Breadcrumb.Item>{firstBread.title}</Breadcrumb.Item>
				) : null}
			</Breadcrumb>
		);
	}
}

export default BreadcrumbCustom;
