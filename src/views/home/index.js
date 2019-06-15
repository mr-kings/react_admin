import React, { Component } from 'react';
import './index.css';
import { FormattedMessage } from 'react-intl';

class Home extends Component {
	render() {
		return (
			<div className="homeWrap">
				<FormattedMessage id="home.name" />
			</div>
		);
	}
}
export default Home;
