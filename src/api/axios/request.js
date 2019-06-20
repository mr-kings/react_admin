import axios from 'axios';
import QS from 'qs';
import { message } from 'antd';

const Axios = axios.create({
	baseURL: '/', // 因为我本地做了反向代理
	timeout: 10000, // 请求超时时间
	responseType: 'json', // 返回类型为json格式
	withCredentials: true, // 是否允许带cookie这些
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
	},
});

// 环境的切换
if (process.env.NODE_ENV === 'development') {
	Axios.baseURL = '/api';
} else if (process.env.NODE_ENV === 'debug') {
	Axios.baseURL = '';
} else if (process.env.NODE_ENV === 'production') {
	Axios.baseURL = 'http://api.123dailu.com/';
}

// 请求拦截器
Axios.interceptors.request.use(
	config => {
		// 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
		// 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
		// const token = store.state.token;
		// token && (config.headers.Authorization = token);
		let flag =
			config.headers['Content-Type'] &&
			config.headers['Content-Type'].indexOf('application/json') !== -1;
		if (!flag) {
			let mult =
				config.headers['Content-Type'] &&
				config.headers['Content-Type'].indexOf('multipart/form-data') !== -1;
			if (!mult) {
				config.data = QS.stringify(config.data);
			}
		}
		return config;
	},
	error => {
		return Promise.error(error);
	}
);

// 响应拦截器
Axios.interceptors.response.use(
	response => {
		if (response.status === 200) {
			return Promise.resolve(response);
		} else {
			return Promise.reject(response);
		}
	},
	// 服务器状态码不是200的情况
	error => {
		if (error.response.status) {
			switch (error.response.status) {
				// 401: 未登录
				// 未登录则跳转登录页面，并携带当前页面的路径
				// 在登录成功后返回当前页面，这一步需要在登录页操作。
				case 401:
					message('未登录');
					// router.replace({
					//     path: '/login',
					//     query: { redirect: router.currentRoute.fullPath }
					// });
					break;
				// 403 token过期
				// 登录过期对用户进行提示
				// 清除本地token和清空vuex中token对象
				// 跳转登录页面
				case 403:
					message('登录过期，请重新登录');
					// 清除token
					// localStorage.removeItem('token');
					// 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
					// setTimeout(() => {
					// 		router.replace({
					// 				path: '/login',
					// 				query: {
					// 						redirect: router.currentRoute.fullPath
					// 				}
					// 		});
					// }, 1000);
					break;
				// 404请求不存在
				case 404:
					message('网络请求不存在');
					break;
				// 其他错误，直接抛出错误提示
				default:
					message(error.response.data.message);
			}
			return Promise.reject(error.response);
		}
	}
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.get(url, {
				params: params,
			})
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params = {}) {
	return new Promise((resolve, reject) => {
		axios
			.post(url, QS.stringify(params))
			.then(res => {
				resolve(res.data);
			})
			.catch(err => {
				reject(err.data);
			});
	});
}
