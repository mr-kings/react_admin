import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { Form, Input, Button } from 'antd';

class SearchForm extends Component {
	// 组件挂载成功
	componentDidMount() {
		this.props.form.validateFields();
	}

	// 搜索
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.onHandleSearch({ nickName: values.nickName });
			}
		});
	};

	// 重置
	onClearSearch = () => {
		this.props.form.resetFields();
		this.props.onHandleSearch({ nickName: '' });
	};

	render() {
		const {
			getFieldDecorator,
			getFieldsError,
			getFieldError,
			isFieldTouched,
		} = this.props.form;

		// Only show error after a field is touched.
		const nickNameError =
			isFieldTouched('nickName') && getFieldError('nickName');
		// const phoneError = isFieldTouched('phone') && getFieldError('phone');

		const hasErrors = fieldsError => {
			return Object.keys(fieldsError).some(field => fieldsError[field]);
		};

		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<Form.Item
					validateStatus={nickNameError ? 'error' : ''}
					help={nickNameError || ''}
				>
					{getFieldDecorator('nickName', {
						rules: [{ required: true, message: '请输入用户昵称' }],
					})(<Input maxLength={30} placeholder="请输入用户昵称" />)}
				</Form.Item>
				{/* <Form.Item
					validateStatus={phoneError ? 'error' : ''}
					help={phoneError || ''}
				>
					{getFieldDecorator('phone', {
						rules: [{ required: true, message: '请输入手机号码' }],
					})(<Input maxLength={11} placeholder="请输入手机号码" />)}
				</Form.Item> */}
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						disabled={hasErrors(getFieldsError())}
					>
						搜索
					</Button>
					<Button
						type="error"
						disabled={hasErrors(getFieldsError())}
						style={{ marginLeft: '10px' }}
						onClick={this.onClearSearch}
					>
						清空
					</Button>
				</Form.Item>
			</Form>
		);
	}
}
const WrappedSearchForm = Form.create({ name: 'search_form' })(SearchForm);
export default WrappedSearchForm;
