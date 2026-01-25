const queryKey = {
	SERVICE: {
		TIP_LIST_PAGE_INFO: ['tips', 'pageInfo'],
		TIP_LIST_BY_PAGE: ['tips', 'pagination'],
		NEWS_LIST_PAGE_INFO: ['news', 'pageInfo'],
		NEWS_LIST_BY_PAGE: ['news', 'pagination'],
		RECENT_NEWS: ['news', 'recent'],
		NOTICE_REVIEW: ['notice_review'],
		PORTFOLIO_REVIEWS: ['reviews', 'portfolio'],
		REVIEW_TOTAL_COUNT: ['reviews', 'totalCount'],
		REVIEW_LIST_PAGE_INFO: ['service', 'reviews', 'pageInfo'],
		REVIEW_LIST_BY_PAGE: ['service', 'reviews', 'pagination'],
		PRODUCTS: ['service', 'products'],
	},
	ADMIN: {
		NEWS_LIST_PAGE_INFO: ['news', 'pageInfo'],
		NEWS_LIST_BY_PAGE: ['news', 'pagination'],
		REGISTERED_USERS_LIST_PAGE_INFO: ['registered_users', 'pageInfo'],
		REGISTERED_USERS_BY_PAGE: ['registered_users', 'pagination'],
		LEGACY_USERS_LIST_PAGE_INFO: ['legacy_users', 'pageInfo'],
		LEGACY_USERS_BY_PAGE: ['legacy_users', 'pagination'],
	},
};

export default queryKey;
