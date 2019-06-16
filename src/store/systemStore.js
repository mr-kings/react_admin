/*
 * @Author: kim
 * @Date: 2019-06-16 16:49:09
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:49:27
 * @Description: 系统配置
 */
import { observable, action, computed } from 'mobx';
import { en_GB, zh_CN } from '@/i18n/langs';

class SystemStore {
	@observable currentLocal = zh_CN;

	@observable localList = [
		{
			name: 'lang',
			label: 'English',
			local: 'en-gb',
			i18n: en_GB,
		},
		{
			name: '语言',
			label: '简体中文',
			local: 'zh-cn',
			i18n: zh_CN,
		},
	];

	@action setCurrentLocal = local => {
		if (local === 'en-gb') {
			this.currentLocal = en_GB;
		} else if (local === 'zh-cn') {
			this.currentLocal = zh_CN;
		}
	};

	@computed get getDefaultLocal() {
		return this.localList[0];
	}

	@computed get getCurrentLocal() {
		return this.currentLocal;
	}
}

export default new SystemStore();
