import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Tag } from 'antd';
import CustomTable from '@/components/table/index';
import SerachForm from './searchForm';
import styles from './userList.module.less';

class UserSearch extends Component {
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
					title: '用户ID',
					dataIndex: 'user_id',
					key: 'user_id',
				},
				{
					title: '昵称',
					dataIndex: 'nickName',
					key: 'nickName',
				},
				{
					title: '关键词',
					dataIndex: 'keyword',
					key: 'keyword',
				},
				{
					title: '提交时间',
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
					user_id: '1',
					nickName: '昵称',
					keyword: '2',
					created_at: '2019-12-12 12:00:00',
					is_deleted: 0,
				},
				{
					id: '2',
					user_id: '1',
					nickName: '昵称',
					keyword: '10',
					created_at: '2019-12-12 12:00:00',
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
export default UserSearch;
