const ONE_SECOND = 1000;

const staleTime = {
  SERVICE: {
    REVIEW_LIST: {
      PAGE_INFO: ONE_SECOND * 60 * 60,
      NOTICE: ONE_SECOND * 60 * 60,
      TOTAL_COUNT: ONE_SECOND * 60 * 60,
      ALL_WITH_PAGINATION: ONE_SECOND * 120,
    },
  },
  ADMIN: {
    NEWS_LIST: {
      PAGE_INFO: ONE_SECOND * 60 * 60,
      ALL_WITH_PAGINATION: ONE_SECOND * 120,
    },
  },
};

export default staleTime;
