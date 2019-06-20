import React, { Component } from 'react';
import { Button } from 'antd';
import styles from './index.module.less';
import PropTypes from 'prop-types';

class Children extends Component {
	// 设置props默认值
	static defaultProps = {
		name: '子组件设置的默认props',
	};

	// 静态类型检查
	static propTypes = {
		name: PropTypes.string,
	};

	// 构造函数
	constructor(props) {
		super(props);
		console.info(`props: ${this.props.name}`);
		this.state = { age: 1 };
		console.info('子组件的constructor');
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		console.info('子组件的getDerivedStateFromProps');
		return null;
	}

	getSnapshotBeforeUpdate() {
		console.info('子组件的getSnapshotBeforeUpdate');
		return null;
	}

	// 组件挂载前钩子
	// componentWillMount() {
	// 	console.info('子组件的componentWillMount');
	// }

	// 组件挂载成功钩子
	componentDidMount() {
		console.info('子组件的componentDidMount');
	}

	// 父组件更新props钩子
	// componentWillReceiveProps(newProps) {
	// 	console.info('子组件的componentWillReceiveProps');
	// }

	// 组件是否需要更新钩子 -- 默认return true（更新）
	shouldComponentUpdate(newProps, newState) {
		console.info('子组件的shouldComponentUpdate');
		return true;
	}

	// 组件更新前钩子
	// componentWillUpdate(nextProps, nextState) {
	// 	console.info('子组件的componentWillUpdate');
	// }

	// 组件更新成功钩子
	componentDidUpdate(prevProps, prevState) {
		console.info('子组件的componentDidUpdate');
	}

	// 组件卸载钩子
	componentWillUnmount() {
		console.info('子组件的componentWillUnmount');
	}

	// 修改state
	handleChangeState = () => {
		this.setState({ age: 10 });
	};

	// 强制更新组件
	handleForceUpdate = () => {
		this.forceUpdate();
	};

	// 组件渲染钩子
	render() {
		console.info('子组件的render');
		return (
			<div className={styles.homeWrap}>
				我是子组件 state: {this.state.age} <br />
				<br />
				<Button onClick={this.handleChangeState}>修改state</Button>
				<br />
				<br />
				<Button onClick={this.handleForceUpdate}>强制更新组件</Button>
			</div>
		);
	}
}
export default Children;
