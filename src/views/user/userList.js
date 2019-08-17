import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Tag } from 'antd';
import CustomTable from '@/components/table/index';
import SerachForm from './searchForm';
import styles from './userList.module.less';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'id',
				},
				{
					title: '签名',
					dataIndex: 'signature',
					key: 'signature',
				},
				{
					title: '昵称',
					dataIndex: 'nickName',
					key: 'nickName',
				},
				{
					title: '手机号',
					dataIndex: 'phone',
					key: 'phone',
				},
				{
					title: '头像',
					dataIndex: 'avatarUrl',
					key: 'avatarUrl',
				},
				{
					title: '地区',
					dataIndex: 'country',
					key: 'country',
					render: (text, records) => {
						return `${text} - ${records.province} - ${records.city}`;
					},
				},
				{
					title: '性别',
					dataIndex: 'gender',
					key: 'gender',
					render: text => {
						const dicts = {
							0: ['未知', 'red'],
							1: ['男', 'geekblue'],
							2: ['女', 'red'],
						};
						return <Tag color={dicts[text][1]}>{dicts[text][0]}</Tag>;
					},
				},
				{
					title: '语言',
					dataIndex: 'language',
					key: 'language',
					render: text => {
						const dict = {
							zh_CN: '简体中文',
							zh_TW: '繁体中文',
							en: '英文',
						};
						return dict[text];
					},
				},
				{
					title: '创建时间',
					dataIndex: 'created_at',
					key: 'created_at',
					defaultSortOrder: 'descend',
					sorter: (a, b) => a.created_at - b.created_at,
				},
				{
					title: '是否删除',
					dataIndex: 'is_deleted',
					key: 'is_deleted',
					render: text => {
						const dict = {
							0: ['未删除', 'geekblue'],
							1: ['已删除', 'red'],
						};
						return <Tag color={dict[text][1]}>{dict[text][0]}</Tag>;
					},
				},
			],
			dataSource: [
				{
					id: '1',
					signature: 'eqweqeqadasdad',
					nickName: '昵称',
					phone: '2342342424',
					avatarUrl: '123123213',
					country: '中国',
					province: '广东省',
					city: '深圳市',
					gender: '1',
					language: 'zh_CN',
					created_at: '2019-12-12 12:00:00',
					is_deleted: 0,
				},
				{
					id: '2',
					signature: 'eqweqeqadasdad',
					nickName: '昵称2',
					phone: '2342342424',
					avatarUrl: '123123213',
					country: '中国',
					province: '广东省',
					city: '深圳市',
					gender: '1',
					language: 'zh_CN',
					created_at: '2019-12-12 13:00:00',
					is_deleted: 0,
				},
			],
			pagination: {
				showSizeChanger: true,
				showQuickJumper: true,
				total: 20, // 数据总数
				pageSize: 10, // 每页条数
				current: 1, // 当前页码
				showTotal: total => {
					return `共 ${total} 条数据`;
				},
			},
			loading: false,
		};
	}

	// 搜索
	onHandleSearch = value => {
		console.info('搜索', value);
	};

	// 分页
	handleTableChange = () => {
		console.info('分页');
	};

	render() {
		const { columns, dataSource, pagination, loading } = this.state;
		return (
			<div className={styles.wrap}>
				<div className={styles.searchWrap}>
					<SerachForm onHandleSearch={this.onHandleSearch} />
				</div>
				<div className={styles.tableWrap}>
					<CustomTable
						dataSource={dataSource}
						columns={columns}
						pagination={pagination}
						loading={loading}
						onChange={this.handleTableChange}
					/>
				</div>
			</div>
		);
	}
}
export default UserList;
