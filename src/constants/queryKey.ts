const queryKey = {
  SERVICE: {
    TIP_LIST_PAGE_INFO: ["tips", "pageInfo"],
    TIP_LIST_BY_PAGE: ["tips", "pagination"],
    NEWS_LIST_PAGE_INFO: ["news", "pageInfo"],
    NEWS_LIST_BY_PAGE: ["news", "pagination"],
    NOTICE_REVIEW: ["notice_review"],
    PORTFOLIO_REVIEWS: ["reviews", "portfolio"],
    REVIEW_TOTAL_COUNT: ["reviews", "totalCount"],
    REVIEW_LIST_PAGE_INFO: ["service", "reviews", "pageInfo"],
    REVIEW_LIST_BY_PAGE: ["service", "reviews", "pagination"],
  },
  ADMIN: {
    NEWS_LIST_PAGE_INFO: ["news", "pageInfo"],
    NEWS_LIST_BY_PAGE: ["news", "pagination"],
  },
};

export default queryKey;
