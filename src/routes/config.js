export default {
	menus: [
		// 菜单相关路由
		{
			key: '/app/index',
			title: '监控面板',
			icon: 'dashboard',
			component: 'home',
		},
		{
			key: '/app/user',
			title: '用户管理',
			icon: 'user',
			subs: [
				{
					key: '/app/user/list',
					parent: { key: '/app/user/list', title: '用户管理' },
					title: '用户列表',
					component: 'userList',
				},
				{
					key: '/app/user/score',
					parent: { key: '/app/user/score', title: '用户管理' },
					title: '用户分数',
					component: 'userScore',
				},
				{
					key: '/app/user/search',
					parent: { key: '/app/user/search', title: '用户管理' },
					title: '用户搜索',
					component: 'userSearch',
				},
				{
					key: '/app/user/feedback',
					parent: { key: '/app/user/feedback', title: '用户管理' },
					title: '用户反馈',
					component: 'userFeedback',
				},
			],
		},
		{
			key: '/app/garbage',
			title: '垃圾管理',
			icon: 'cloud-sync',
			subs: [
				{
					key: '/app/garbage/classfication',
					parent: { key: '/app/garbage/classfication', title: '垃圾管理' },
					title: '垃圾分类',
					component: 'garbageSort',
				},
				{
					key: '/app/garbage/list',
					parent: { key: '/app/garbage/list', title: '垃圾管理' },
					title: '垃圾列表',
					component: 'garbageList',
				},
			],
		},
	],
	others: [], // 非菜单相关路由
};
