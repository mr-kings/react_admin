import React, {Component} from 'react';
import screenfull from 'screenfull';
import avater from '../../assets/imgs/avater.jpg';
import {
    Menu,
    Icon,
    Layout,
    Badge,
} from 'antd';
import './index.css';
const {
    Header
} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

/**
 * 自定义头部导航
 * @author kim
 * @date 2019-4-14
 * @class CustomHeader
 * @extends {Component}
 */
class CustomHeader extends Component {

    // 全屏操作
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };

    render(){
        return (
            <div className="headerWrap">
                <Header className="custom-theme header" >
                    <Menu
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="full" onClick={this.screenFull} >
                            <Icon className="headerIcon" type="arrows-alt" onClick={this.screenFull} />
                        </Menu.Item>
                        <Menu.Item key="1">
                            <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                                <Icon type="notification" />
                            </Badge>
                        </Menu.Item>
                        <SubMenu title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                            <MenuItemGroup title="用户中心">
                                <Menu.Item key="setting:2">个人信息</Menu.Item>
                                <Menu.Item key="logout"><span onClick={this.logout}>退出登录</span></Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="设置中心">
                                <Menu.Item key="setting:3">个人设置</Menu.Item>
                                <Menu.Item key="setting:4">系统设置</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>
                    </Menu>
                </Header>
            </div>
        )
    }
}
export default CustomHeader;