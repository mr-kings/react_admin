import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.module.less';
import Children from './children';

class Parent extends Component {
	// 构造函数
	constructor(props) {
		super(props);
		this.state = { name: '我是父组件传给子组件的props', unmount: false };
		console.info('父组件的constructor');
	}

	// 组件挂载前钩子
	componentWillMount() {
		console.info('父组件的componentWillMount');
	}

	// 组件挂载成功钩子
	componentDidMount() {
		console.info('父组件的componentDidMount');
	}

	// 组件是否需要更新 默认return true（更新）
	shouldComponentUpdate(newProps, newState) {
		console.info('父组件的shouldComponentUpdate');
		return true;
	}

	// 组件更新前钩子
	componentWillUpdate(nextProps, nextState) {
		console.info('父组件的componentWillUpdate');
	}

	// 组件更新成功钩子
	componentDidUpdate(prevProps, prevState) {
		console.info('父组件的componentDidUpdate');
	}

	// 更新子组件的props
	handleChangeProps = () => {
		this.setState({ name: '父组件修改了子组件的props' });
	};

	// 卸载子组件
	handleUnmountChildren = () => {
		this.setState({ unmount: true });
	};

	// 组件渲染钩子
	render() {
		console.info('父组件的render');
		return (
			<div className={styles.homeWrap}>
				我是父组件 props:
				{this.state.name ? this.state.name : '父组件不给子组件传props'}
				<br />
				<br />
				<Button
					style={{ marginBottom: '20px' }}
					onClick={this.handleChangeProps}
				>
					修改子组件的props
				</Button>
				<br />
				<Button
					style={{ marginBottom: '20px' }}
					onClick={this.handleUnmountChildren}
				>
					卸载子组件
				</Button>
				<br />
				<br />
				{this.state && this.state.name && !this.state.unmount ? (
					<Children name={this.state.name}></Children>
				) : this.state.unmount ? null : (
					<Children></Children>
				)}
			</div>
		);
	}
}
export default Parent;
