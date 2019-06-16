export default {
	menus: [
		// 菜单相关路由
		{
			key: '/app/index',
			title: '首页',
			icon: 'mobile',
			component: 'home',
		},
		{
			key: '/app/ui',
			title: 'UI',
			icon: 'scan',
			subs: [
				{
					key: '/app/ui/upload',
					parent: { key: '/app/ui/upload', title: 'UI' },
					title: '自定义上传',
					component: 'upload',
				},
			],
		},
	],
	others: [], // 非菜单相关路由
};
