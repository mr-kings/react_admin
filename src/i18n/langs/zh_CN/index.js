import antdZh from 'antd/lib/locale-provider/zh_CN';
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from './zh_CN.json';

export default {
	messages: {
		...zhMessages,
	},
	antd: antdZh,
	locale: 'zh',
	data: appLocaleData,
};
