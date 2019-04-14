import React, {Component} from 'react';
import { Layout } from 'antd';
import Routes from '../../routes/index';
import CustomHeader from '../header/index';
import CustomSide from '../siderBar/index';
import CustomBreadcrumb from '../breadcrumb/index';

import './index.css'

const { Content, Footer } = Layout;
/**
 * 页面布局组件
 * @author kim
 * @date 2019-4-14
 * @class LayoutComponent
 * @extends {Component}
 */
class LayoutComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false,
            title: ''
        }
    }
    // 展开收起
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }

    // 设置title
    setTitle = (route) => {
        console.log('setTitle', route)
        if (this.state.title === route.title) return;
        //this.setState({ title: route.title });
    }

    render() {
        return (
            <Layout className="layoutWrap">
                <CustomSide collapsed={this.state.collapsed}></CustomSide>
                <Layout>
                    <CustomHeader></CustomHeader>
                    <Content className="contentWrap">
                        <CustomBreadcrumb first={this.state.title}></CustomBreadcrumb>
                        <div className="contentBox">
                            <Routes onRouterChange={this.setTitle} />
                        </div>
                    </Content>
                    <Footer className="footerWrap">
                        React Admin ©2019 Created by kim
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

export default LayoutComponent;
