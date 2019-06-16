/*
 * @Author: kim
 * @Date: 2019-06-16 16:48:22
 * @Last Modified by: kim
 * @Last Modified time: 2019-06-16 16:48:56
 * @Description: 设置面包屑导航
 */
import { observable, action } from 'mobx';

class BreadcrumbStore {
	@observable firstBread = { url: '', title: '' };
	@observable secondBread = { url: '', title: '' };

	@action setFirstBread = route => {
		this.firstBread.url = route ? route.key : '';
		this.firstBread.title = route ? route.title : '';
	};

	@action setSecondBread = route => {
		this.secondBread.url = route ? route.key : '';
		this.secondBread.title = route ? route.title : '';
	};
}

export default new BreadcrumbStore();
