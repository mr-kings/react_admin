/**
 * 路由组件出口文件
 * @author kim
 * @date 2019-4-14
 * @description 路由组件
 */
import Loadable from 'react-loadable';
import Loading from '@/components/spinnerLoading/index';

const userList = Loadable({
	loader: () => import('@/views/user/userList'),
	loading: Loading,
});
const userScore = Loadable({
	loader: () => import('@/views/user/userScore'),
	loading: Loading,
});
const userSearch = Loadable({
	loader: () => import('@/views/user/userSearch'),
	loading: Loading,
});
const userFeedback = Loadable({
	loader: () => import('@/views/user/userFeedback'),
	loading: Loading,
});
const garbageSort = Loadable({
	loader: () => import('@/views/garbage/garbageSort'),
	loading: Loading,
});
const garbageList = Loadable({
	loader: () => import('@/views/garbage/garbageList'),
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
	home,
	userList,
	userScore,
	userSearch,
	userFeedback,
	garbageSort,
	garbageList,
	notPermission,
	notFound,
};
