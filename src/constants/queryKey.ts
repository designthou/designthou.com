const queryKey = {
  SERVICE: {
    NOTICE_REVIEW: ["notice_review"],
    REVIEW_TOTAL_COUNT: ["reviewList", "count"],
    REVIEW_LIST_PAGE_INFO: ["reviewListPagination", "pageInfo"],
    REVIEW_LIST_BY_PAGE: ["reviewListByPage"],
  },
  ADMIN: {
    NEWS_LIST_PAGE_INFO: ["newsListPagination", "pageInfo"],
    NEWS_LIST_BY_PAGE: ["newsListByPage"],
  },
};

export default queryKey;
