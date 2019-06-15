/**
 * 路由组件出口文件
 * @author kim
 * @date 2019-4-14
 * @description 路由组件
 */
import Loadable from 'react-loadable';
import Loading from '@/components/spinnerLoading/index';

const upload = Loadable({
	loader: () => import('@/components/upload/index'),
	loading: Loading,
});
const home = Loadable({
	loader: () => import('./home/index'),
	loading: Loading,
});
const notPermission = Loadable({
	loader: () => import('@/components/error/notPermission'),
	loading: Loading,
});
const notFound = Loadable({
	loader: () => import('@/components/error/notFound'),
	loading: Loading,
});

export default {
	upload,
	home,
	notPermission,
	notFound,
};
