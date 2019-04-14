import React, { Component } from 'react';
import { Layout } from 'antd';
import { withRouter } from 'react-router-dom';
import routes from '../../routes/config';
import SiderMenu from './sideMenu';

const { Sider } = Layout;

/**
 * 自定义左侧菜单
 * @author kim
 * @date 2019-4-14
 * @class SiderCustom
 * @extends {Component}
 */
class SiderCustom extends Component {
    static getDerivedStateFromProps (props, state) {
        console.log('getDerivedStateFromProps', props)
        console.log('getDerivedStateFromProps', state)
        if (props.collapsed !== state.collapsed) {
            const state1 = SiderCustom.setMenuOpen(props);
            const state2 = SiderCustom.onCollapse(props.collapsed);
            return {
                ...state1,
                ...state2,
                firstHide: state.collapsed !== props.collapsed && props.collapsed, // 两个不等时赋值props属性值否则为false
                openKey: state.openKey || (!props.collapsed && state1.openKey)
            }
        }
        return null;
    }
    static setMenuOpen = props => {
        console.log('setMenuOpen', props)
        const { pathname } = props.location;
        return {
            openKey: pathname.substr(0, pathname.lastIndexOf('/')),
            selectedKey: pathname
        };
    };
    static onCollapse = (collapsed) => {
        console.log('onCollapse', collapsed);
        return {
            collapsed,
            firstHide: collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        };
    };
    state = {
        collapsed: false,
        mode: 'inline',
        openKey: '',
        selectedKey: '',
        firstHide: true, // 点击收缩菜单，第一次隐藏展开子菜单，openMenu时恢复
    };
    componentDidMount() {
        // this.setMenuOpen(this.props);
        console.log('componentDidMount', this.props);
        const state = SiderCustom.setMenuOpen(this.props);
        this.setState(state);
    }
    menuClick = e => {
        console.log('menuClick', this.state);
        this.setState({
            selectedKey: e.key
        });
        const { popoverHide } = this.props; // 响应式布局控制小屏幕点击菜单时隐藏菜单操作
        popoverHide && popoverHide();
    };
    openMenu = v => {
        console.log('openMenu', v);
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render() {
        return (
            <Sider
                breakpoint="lg"
                collapsed={this.props.collapsed}
                style={{ overflowY: 'auto' }}
            >
                <div className="logo" />
                <SiderMenu
                    theme="dark"
                    menus={routes.menus}
                    onClick={this.menuClick}
                    mode="inline"
                    selectedKeys={[this.state.selectedKey]}
                    openKeys={this.state.firstHide ? null : [this.state.openKey]}
                    onOpenChange={this.openMenu}
                />
            </Sider>
        )
    }
}

export default withRouter(SiderCustom);