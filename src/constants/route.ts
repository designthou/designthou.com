const route = {
	AUTH: {
		ROOT: '/auth',
		LOGIN: '/auth/login',
		SIGNUP: '/auth/signup',
		FORGOT_PASSWORD: '/auth/forgot-password',
		RESET_PASSWORD: '/auth/reset-password',
		SIGNUP_CONFIRM: '/auth/signup/confirm',
	},
	SERVICE: {
		ROOT: '/',
		NEWS: '/news',
		FREE_SOURCE: '/open-source',
		COMPETITION: '/competition',
		TIPS: '/tips',
		REVIEWS: '/reviews',
		QUESTION_BOARD: '/question-board',
		ONLINE_COURSE: '/online-course',
		SETTINGS: {
			ROOT: '/settings',
			MYACCOUNT_PROFILE: '/settings/myaccount/profile',
			SUBSCRIPTION: '/settings/myaccount/subscription',
		},
		ABOUT: '/about',
		NOTICE: '/notice',
		FAQ: '/faq',
		TERMS: '/terms',
		PRIVACY: '/privacy',
		SUPPORT: '/support',
		NOT_FOUND: '/*',
	},
	ADMIN: {
		ROOT: '/admin',
		DASHBOARD: '/admin/dashboard',
		MYPAGE: '/admin/mypage',
		NEWS: '/admin/news',
		FREE_SOURCE: '/admin/open-source',
		COMPETITION: '/admin/competition',
		TIPS: '/admin/tips',
		REVIEWS: '/admin/reviews',
		ONLINE_COURSE: '/admin/online-course',
		USERS: '/admin/user-list',
	},
	OUTER: {
		GITHUB: 'https://github.com/designthou/designthou.com',
	},
};

export default route;
