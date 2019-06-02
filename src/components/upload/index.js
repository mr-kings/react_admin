import React, { Component } from "react";
import {message,Popover} from 'antd';
import {
    Upload,
    Button,
    Icon
} from 'antd';
import './index.css';

/**
 * 自定义上传组件
 * @author Kim
 * @date 2019-4-13
 * @description 自定义上传组件
 * @class CustomUpload
 * @extends {Component}
 */
class CustomUpload extends Component {
    constructor(props){
        super(props);
        this.state = {
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                type: 'picture',
                status: 'error',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: '-2',
                name: 'yyy.xlsx',
                type: 'file-excel',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: '-3',
                name: 'yyy.ppt',
                type: 'file-ppt',
                status: 'error',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: '-4',
                name: 'yyy.pdf',
                type: 'file-pdf',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }, {
                uid: '-5',
                name: 'yyy.doc',
                type: 'file-word',
                status: 'uploading',
                percent: 10,
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }]
        }
    }

    // 组件挂载成功后
    componentDidMount(){

    }

    // 上传前事件
    handleBeforeUpload = (file, fileList) => {
        console.log('handleBeforeUpload file', file)
        console.log('handleBeforeUpload fileList', fileList)
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isJPEG = file.type === 'image/jpeg';
        const isGIF = file.type === 'image/gif';
        const isPDF = file.type === 'application/pdf';
        const isDoc = file.type === 'application/msword';
        const isDocx = file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        const isPic = isJPG || isJPEG || isGIF || isPNG;
        const isWord = isDoc || isDocx;
        if (!(isPic || isWord || isPDF)) {
            message.error('只能上传JPG 、JPEG 、GIF、 PNG格式的图片或PDF、DOC、DOCX格式的文件~');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('超过2M限制 不允许上传~');
        }
        return (isPic || isWord || isPDF) && isLt2M;
    }

    // 上传文件改变状态是
    handleChange = (info) => {
        console.log('handleChange info', info)
        let fileList = info.fileList;

        if (fileList.length > 10) {
            message.error("上传超出了限制")
        } else {
            console.log('正常上传', info)
            // 1. Limit the number of uploaded files
            // Only to show two recent uploaded files, and old ones will be replaced by the new
            // fileList = fileList.slice(-2);

            // 2. Read from response and show file link
            fileList = fileList.map((file) => {
                if (file.response) {
                    // Component will show file.url as link
                    file.url = file.response.url;
                }
                return file;
            });

            // 3. Filter successfully uploaded files according to response from server
            fileList = fileList.filter((file) => {
                if (file) {
                    return file.status !== 'removed';
                }
                return false;
            });

            this.setState({
                fileList
            });
        }
    }

    // 自定义上传组件
    handleCustomResquest = (info) => {
        console.log('handleCustomResquest info', info)
    }

    // 预览回调
    handlePreview = (file) => {
        console.log('handlePreview file', file)
    }

    // 删除回调
    handleRemove = (file) => {
        console.log('handleRemove file', file)
    }

    render(){
        // 获取已上传的文件
        const {fileList} = this.state;
        const {inline} = this.props;
        const className = inline ? "uploadListWrap inline" : "uploadListWrap";
        // 上传属性
        const props = {
            name: 'files',
            accept: 'image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document', // 上传支持的格式
            action: 'https://gdpo-test.yun.city.pingan.com/gdyqpt/api/obsInfo/upload/file', // 文件上传服务器
            directory: false, // 是否支持上传文件夹
            onChange: this.handleChange, // 上传回调函数
            customRequest: this.handleCustomResquest, // 自定义上传
            data: {}, // 上传所需参数
            headers: {}, // 上传的请求头部
            withCredentials: false, // 上传时是否携带cookies
            disabled: false, // 是否禁用
            multiple: true, // 支持多选
            defaultFileList: fileList, // 已上传的文件列表
            fileList: fileList, // 上传列表数量的限制,读取远程路径并显示链接,按照服务器返回信息筛选成功上传的文件
            beforeUpload: this.handleBeforeUpload, // 限制用户上传的图片格式和大小
            listType: 'picture', // 支持三种基本样式 text, picture 和 picture-card
            showUploadList: false, // 是否显示上传列表
            onPreview: this.handlePreview, //预览
            onRemove: this.handleRemove // 删除回调
        };
        return (<div className="uploadWrap">
            <Upload {...props}>
                <Button>
                    <Icon type="upload" /> 本地上传
                </Button>
            </Upload>
            <div className={className}>
                {
                    fileList.map(item =>
                        <div className="uploadItem" key={item.uid}>
                            <div className="itemLogo">
                                {/* <img src={item.thumbUrl} alt={item.name}/> */}
                                <Icon className="itemPicIcon" type={item.type} />
                            </div>
                            <div className="itemName">
                                {
                                    item.status === 'error' ? <div className="error name">
                                        <Popover placement="top" title="" content="上传失败">
                                            {item.name}
                                        </Popover>
                                    </div> : <div className="name">{item.name}</div>
                                }
                                {
                                    item.status === 'uploading' ? <div className="progress">
                                        <div className="dot" style={{width: item.percent+'%'}} />
                                    </div> : null
                                }
                            </div>
                            <div className="itemRemove">
                                {
                                    item.status === 'error' ? <Icon className="error itemRemoveIcon" type="delete" title="删除该文件" onClick={this.handleRemove.bind(this,item)} /> : <Icon className="itemRemoveIcon" type="delete" title="删除该文件" onClick={this.handleRemove.bind(this,item)} />
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>)
    }
}
export default CustomUpload;