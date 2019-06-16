/*
 * @Author: kim
 * @Date: 2019-06-16 00:43:32
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:59:27
 */
import React, { Component } from 'react';
import { ChromePicker, SketchPicker } from 'react-color';
import style from './index.module.less';

const noop = () => {};

const pickers = {
	chrome: ChromePicker,
	sketch: SketchPicker,
};

class ColorPicker extends Component {
	static defaultProps = {
		onChange: noop,
		onChangeComplete: noop,
		position: 'bottom',
	};

	static getDerivedStateFromProps(props) {
		if ('color' in props) {
			return {
				color: props.color,
			};
		}
		return null;
	}

	state = {
		color: this.props.color,
		displayColorPicker: false,
	};

	// 点击事件
	handleClick = () => {
		const { displayColorPicker } = this.state;
		this.setState({
			displayColorPicker: !displayColorPicker,
		});
	};

	// 关闭事件
	handleClose = () => {
		this.setState({
			displayColorPicker: false,
		});
	};

	// 颜色切换
	handleChange = color => {
		const { onChange } = this.props;
		this.setState({
			color: color.hex,
		});
		onChange(color.hex, color);
	};

	// 颜色切换成功
	handleChangeComplete = color => {
		const { onChangeComplete } = this.props;
		this.setState({
			color: color.hex,
		});
		onChangeComplete(color.hex);
	};

	render() {
		const { small, type, position } = this.props;
		const { color, displayColorPicker } = this.state;
		const Picker = pickers[type];
		const styles = {
			color: {
				width: small ? '30px' : '120px',
				height: small ? '16px' : '24px',
				borderRadius: '2px',
				background: color,
			},
			swatch: {
				padding: '1px',
				background: '#fff',
				borderRadius: '2px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer',
			},
			popover: {
				position: 'absolute',
				zIndex: '2',
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px',
			},
			wrapper: {
				position: 'inherit',
				zIndex: '100',
				right: '-120px',
			},
		};

		if (position === 'top') {
			styles.wrapper.transform = 'translateY(-100%)';
			styles.wrapper.paddingBottom = 8;
		}

		const swatch = (
			<div style={styles.swatch} onClick={this.handleClick}>
				<div style={styles.color} />
			</div>
		);

		const picker = displayColorPicker ? (
			<div style={styles.popover} className={style.pickerWrap}>
				<div style={styles.cover} onClick={this.handleClose} />
				<div style={styles.wrapper}>
					<Picker
						{...this.props}
						color={color}
						onChange={this.handleChange}
						onChangeComplete={this.handleChangeComplete}
					/>
				</div>
			</div>
		) : null;

		if (position === 'top') {
			return (
				<>
					{picker} {swatch}
				</>
			);
		}
		return (
			<>
				{swatch} {picker}
			</>
		);
	}
}

export default ColorPicker;
