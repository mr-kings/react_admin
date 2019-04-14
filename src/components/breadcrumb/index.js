import React, {Component} from 'react';
import { Breadcrumb } from 'antd';
// import { Link } from 'react-router-dom';

class BreadcrumbCustom extends Component {
    render() {
        const first = <Breadcrumb.Item>{this.props.first}</Breadcrumb.Item> || '';
        const second = <Breadcrumb.Item>{this.props.second}</Breadcrumb.Item> || '';
        return (
            <span>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {/* <Link to={'/app/dashboard/index'}>首页</Link> */}
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                        {first}
                        {second}
                </Breadcrumb>
            </span>
        )
    }
}

export default BreadcrumbCustom;