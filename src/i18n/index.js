import React,{ Component } from 'react';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import enGB from 'antd/lib/locale-provider/en_GB';
import moment from 'moment';
import 'moment/locale/zh-cn'; // 解决 antd 日期组件国际化问题
import {observer,inject} from "mobx-react";
import {
    IntlProvider,
    addLocaleData,
} from 'react-intl';

/**
 * 国际化
 * @class LocalLanguage
 * @extends {Component}
 */
@inject('systemStore')
@observer
class LocalLanguage extends Component {
    constructor(...props) {
        super(...props);
        let {local, autoLocal} = this.props;

        // 不基于浏览器自动获取，将语言设置为默认
        if (!autoLocal) local = this.props.systemStore.getDefaultLocal.local;

        // 从浏览器存储中恢复语言
        const storeLocal = window.localStorage.getItem('system-local');

        if (storeLocal) local = storeLocal;

        // 如果没有选择过语言，通过浏览器获取语言
        if (!local && autoLocal) {
            local = getLocalByBrowser();
        }

        // 设置本地语言
        this.props.systemStore.setCurrentLocal(local);

        function getLocalByBrowser() {
            const type = navigator.appName;
            const defaultLocal = 'en_gb'; // 如果未获取到，默认语言为英文
            let lang;

            if (type === 'Netscape') {
                lang = navigator.language; // 获取浏览器配置语言，支持非IE浏览器
            } else {
                lang = navigator.userLanguage; // 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
            }

            if (!lang) return defaultLocal;

            lang = lang.replace('-', '_');

            const {localList} = this.props.systemStore;
            const exactLang = localList.find(item => item.local === lang);
            const firstTowCharLang = localList.find(item => item.local.substr(0, 2) === lang.substr(0, 2));

            // 完全匹配了
            if (exactLang) return exactLang.local;

            // 前两位匹配
            if (firstTowCharLang) return firstTowCharLang.local;

            // 未查找到匹配的语言，设置成默认语言
            return defaultLocal;
        }
    }


    render() {
        const {children, local} = this.props;
        const appLocale = this.props.systemStore.getCurrentLocal;
        addLocaleData(appLocale.data);
        const antLocalMap = {
            'zh-cn': zhCN,
            'en-gb': enGB,
        };

        if (local) moment.locale(local);

        const antLan = antLocalMap[local];

        return (
            <LocaleProvider locale={antLan}>
                <IntlProvider
                    locale={appLocale.locale}
                    messages={appLocale.messages}
                >
                    {children}
                </IntlProvider>
            </LocaleProvider>
        );
    }
}

export default LocalLanguage;
