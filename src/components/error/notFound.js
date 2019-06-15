import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export default class Error404 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			time: 9,
		};
	}

	// 组件挂载成功
	componentDidMount() {
		this.bodyOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		if (this.props.history.length >= 2) {
			this.sI = setInterval(() => {
				const time = this.state.time - 1;
				if (time === 0) this.handleGoBack();
				this.setState({
					time,
				});
			}, 1000);
		}
	}

	// 组件卸载
	componentWillUnmount() {
		clearInterval(this.sI);
		document.body.style.overflow = this.bodyOverflow;
	}

	// 返回
	handleGoBack = () => {
		this.props.history.goBack();
	};

	render() {
		const { history } = this.props;
		const { time } = this.state;
		return (
			<div className="root error404">
				<div className="container">
					<div className="header">
						<h3> 您访问的页面不存在! </h3>
					</div>
					<p className="intro">
						跳转到 <Link to="/"> 首页 </Link>
						{history.length >= 2 ? (
							<span>
								或者返回
								<span onClick={this.handleGoBack}> 上一步（ {time}） </span>
							</span>
						) : null}
					</p>
				</div>
			</div>
		);
	}
}
