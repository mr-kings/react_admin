import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class Error401 extends Component {
    state = {
        time: 9,
    };

    handleGoBack = () => {
        this.props.history.goBack();
    };

    componentDidMount() {
        this.bodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        this.sI = setInterval(() => {
            const time = this.state.time - 1;

            // 调转登录页 if (time === 0);

            this.setState({time});
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.sI);
        document.body.style.overflow = this.bodyOverflow;
    }

    render() {
        const {history} = this.props;
        const {time} = this.state;
        return (
            <div className="root error401">
                <div className="container">
                    <div className="header">
                        <h3>您还未登录！</h3>
                    </div>
                    <p className="intro">
                        跳转到<Link to="/app/index"> 登录页({time}) </Link>
                        {history.length >= 2 ? <span> 或者返回 <span onClick={this.handleGoBack}>上一步</span></span> : null}
                    </p>
                </div>
            </div>
        );
    }
}