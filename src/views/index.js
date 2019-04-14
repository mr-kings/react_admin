/**
 * 路由组件出口文件
 * @author kim
 * @date 2019-4-14
 * @description 路由组件
 */
import Loadable from 'react-loadable';
import Loading from '../components/widget/Loading';

const upload = Loadable({ // 按需加载
    loader: () => import('../components/upload/index'),
    loading: Loading,
});
const home = Loadable({ // 按需加载
    loader: () => import('./home/index'),
    loading: Loading,
});
const notPermission = Loadable({ // 按需加载
    loader: () => import('../components/error/notPermission'),
    loading: Loading,
});
const notFound = Loadable({ // 按需加载
    loader: () => import('../components/error/notFound'),
    loading: Loading,
});

export default {
    upload,
    home,
    notPermission,
    notFound
}