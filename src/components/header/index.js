import React, {Component} from 'react';
import screenfull from 'screenfull';
import moment from 'moment';
import avater from '@/assets/imgs/avater.png';
import {
    Menu,
    Icon,
    Layout,
    Radio
} from 'antd';
import ThemeColorPicker from '../header-color-picker/index';
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

    constructor() {
        super();
        this.state = {
            locale: null,
        };
    }

    // 全屏操作
    screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
    };

    changeLocale = e => {
        const localeValue = e.target.value;
        this.setState({ locale: localeValue });
        if (!localeValue) {
            moment.locale('en');
        } else {
            moment.locale('zh-cn');
        }
    };

    render(){
        const { locale } = this.state;
        return (
            <div className="headerWrap">
                <Header className="custom-header" >
                    <Icon
                        className="header__trigger"
                        type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.props.toggle}
                    />
                    <Menu
                        mode="horizontal"
                        style={{ lineHeight: '64px', float: 'right' }}
                    >
                        <Menu.Item key="full" onClick={this.screenFull} >
                            <Icon className="headerIcon" type="fullscreen" onClick={this.screenFull} />
                        </Menu.Item>
                        <Menu.Item key="color" >
                            <ThemeColorPicker />
                        </Menu.Item>
                        <Menu.Item key="i18n" >
                            <Radio.Group defaultValue={undefined} onChange={this.changeLocale}>
                                <Radio.Button key="en" value={undefined}>
                                English
                                </Radio.Button>
                                <Radio.Button key="cn" value={undefined}>
                                中文
                                </Radio.Button>
                            </Radio.Group>
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