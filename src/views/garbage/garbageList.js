import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Tag, Button, Select, Input } from 'antd';
import CustomTable from '@/components/table/index';
import styles from './garbageList.module.less';

class GarbageList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sorts: [
				{
					id: '1',
					name: '可回收物',
					description: '是指适宜回收循环使用和资源再利用的废弃物',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 13:00:00',
					is_deleted: 0,
				},
				{
					id: '2',
					name: '有害垃圾',
					description:
						'是指对人体健康或者自然环境造成直接或者潜在危害的生活废弃物',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 13:00:00',
					is_deleted: 0,
				},
				{
					id: '3',
					name: '湿垃圾',
					description: '是指日常生活垃圾中可分解的有机物质部分',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 13:00:00',
					is_deleted: 0,
				},
				{
					id: '4',
					name: '干垃圾',
					description:
						'是指除可回收物、有害垃圾、厨余垃圾（湿垃圾）以外的其它生活废弃物',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 13:00:00',
					is_deleted: 0,
				},
			],
			columns: [
				{
					title: 'ID',
					dataIndex: 'id',
					key: 'id',
				},
				{
					title: '名称',
					dataIndex: 'name',
					key: 'name',
				},
				{
					title: '所属分类',
					dataIndex: 'sort',
					key: 'sort',
				},
				{
					title: '描述',
					dataIndex: 'description',
					key: 'description',
				},
				{
					title: '封面图片',
					dataIndex: 'imageUrl',
					key: 'imageUrl',
				},
				{
					title: '创建时间',
					dataIndex: 'created_at',
					key: 'created_at',
					defaultSortOrder: 'descend',
					sorter: (a, b) => a.created_at - b.created_at,
				},
				{
					title: '更新时间',
					dataIndex: 'updated_at',
					key: 'updated_at',
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
				{
					title: '操作',
					dataIndex: 'action',
					key: 'action',
					align: 'center',
					render: text => {
						return (
							<>
								<Button className={styles.button}>编辑</Button>
								<Button type="danger" className={styles.button}>
									删除
								</Button>
							</>
						);
					},
				},
			],
			dataSource: [
				{
					id: '1',
					sort: '湿垃圾',
					name: '艾草',
					description: '描述',
					imageUrl: '123123213',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 12:00:01',
					is_deleted: 0,
				},
				{
					id: '2',
					sort: '湿垃圾',
					name: '艾草',
					description: '描述',
					imageUrl: '123123213',
					created_at: '2019-12-12 12:00:00',
					updated_at: '2019-12-12 12:00:01',
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
		const { columns, dataSource, pagination, loading, sorts } = this.state;
		return (
			<div className={styles.wrap}>
				<div className={styles.searchWrap}>
					<Select
						className={styles.search}
						allowClear
						onChange={this.onHandleSearch}
						placeholder="按分类搜索"
					>
						{sorts.map(item => (
							<Select.Option key={item.id} value={item.id}>
								{item.name}
							</Select.Option>
						))}
					</Select>
					<Input.Search
						className={styles.search}
						placeholder="按名称搜索"
					></Input.Search>
					<Button type="primary" className={styles.create}>
						新增
					</Button>
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
export default GarbageList;
