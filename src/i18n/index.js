/*
 * @Author: kim
 * @Date: 2019-06-16 16:45:31
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 18:56:41
 * @Description: 国际化
 */
import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { observer, inject } from 'mobx-react';
import { IntlProvider, addLocaleData } from 'react-intl';

@inject('systemStore')
@observer
class LocalLanguage extends Component {
	componentDidMount() {
		const { systemStore } = this.props;
		// 不基于浏览器自动获取，将语言设置为默认
		let currentLocal = systemStore.getDefaultLocal.local;

		// 从浏览器存储中恢复语言
		const storeLocal = window.localStorage.getItem('system-local');
		if (storeLocal) currentLocal = storeLocal;

		// 如果没有选择过语言，通过浏览器获取语言
		if (!currentLocal) {
			currentLocal = this.getLocalByBrowser();
		}

		// 设置本地语言
		systemStore.setCurrentLocal(currentLocal);
	}

	getLocalByBrowser = () => {
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
		const { localList } = this.props.systemStore;
		const exactLang = localList.find(item => item.local === lang);
		const firstTowCharLang = localList.find(
			item => item.local.substr(0, 2) === lang.substr(0, 2)
		);
		// 完全匹配了
		if (exactLang) return exactLang.local;
		// 前两位匹配
		if (firstTowCharLang) return firstTowCharLang.local;
		// 未查找到匹配的语言，设置成默认语言
		return defaultLocal;
	};

	render() {
		const {
			systemStore: { getCurrentLocal },
		} = this.props;
		const appLocale = getCurrentLocal;
		addLocaleData(appLocale.data);
		const local = appLocale.antd.locale;
		if (local) moment.locale(local);
		return (
			<LocaleProvider locale={appLocale.antd}>
				<IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
					{this.props.children}
				</IntlProvider>
			</LocaleProvider>
		);
	}
}

export default LocalLanguage;
