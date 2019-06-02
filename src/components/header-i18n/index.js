import React, {Component} from 'react';
import {Menu, Dropdown} from 'antd';
import i18n from '../../i18n/langs/';
import './style.less';

const Item = Menu.Item;

export default class HeaderI18n extends Component {
    static defaultProps = {
        theme: 'default',
    };

    handleMenuClick = ({key}) => {
        this.props.action.system.setLocal(key);
    };

    render() {
        const { theme, local, style} = this.props;
        const menu = (
            <Menu
                className="menu"
                theme={theme}
                onClick={this.handleMenuClick}
            >
                {i18n.map(item => (<Item key={item.local}>{item.label}</Item>))}
            </Menu>
        );
        const localI1n8 = i18n.find(item => item.local === local) || {};
        return (
            <div
                className="i18n-select"
                ref={node => this.root = node}
                style={style}
            >
                <Dropdown
                    overlay={menu}
                    getPopupContainer={() => (this.root || document.body)}
                >
                    <span className="i18n-label">
                        <span>{localI1n8.name||'简体中文'}</span>
                        {/* <Icon type="caret-down" /> */}
                    </span>
                </Dropdown>
            </div>
        );
    }
}
