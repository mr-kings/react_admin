import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';
import { Resizable } from 'react-resizable';

const ResizeableTitle = props => {
	const { onResize, width, ...restProps } = props;
	if (!width) {
		return <th {...restProps} />;
	}
	return (
		<Resizable
			width={width}
			height={0}
			onResize={onResize}
			draggableOpts={{ enableUserSelectHack: false }}
		>
			<th {...restProps} />
		</Resizable>
	);
};

class CustomTable extends Component {
	// 表格组件
	components = {
		header: {
			cell: ResizeableTitle,
		},
	};

	// 可拖拽列处理
	handleResize = index => (e, { size }) => {
		this.setState(({ columns }) => {
			const nextColumns = [...columns];
			nextColumns[index] = {
				...nextColumns[index],
				width: size.width,
			};
			return { columns: nextColumns };
		});
	};

	// 分页
	handleTableChange = () => {
		console.info('分页');
	};

	render() {
		const { columns, dataSource, pagination, loading } = this.props;
		const newColumns = columns.map((col, index) => ({
			...col,
			onHeaderCell: column => ({
				width: column.width,
				onResize: this.handleResize(index),
			}),
		}));

		return (
			<Table
				bordered
				components={this.components}
				rowKey={record => record.id || 'id'}
				dataSource={dataSource}
				columns={newColumns}
				pagination={pagination}
				loading={loading}
				onChange={this.handleTableChange}
				// scroll={{ x: 1000, y: true }}
			/>
		);
	}
}
export default CustomTable;
