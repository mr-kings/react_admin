import React from 'react';
import {
    Layout,
    Menu,
    Icon
} from 'antd';
import './layout';

const {
    Header,
    Sider,
    Content
} = Layout;

export default class SiderDemo extends React.Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <Layout>
                <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
                >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                    <Icon type="user" />
                    <span>nav 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="video-camera" />
                    <span>nav 2</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                    <Icon type="upload" />
                    <span>nav 3</span>
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                < Header className="headerWrap">
                    <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    />
                </Header>
                <Content className = "contentWrap">
                    Content
                </Content>
                </Layout>
            </Layout>
        );
    }
}
