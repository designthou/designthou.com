const ONE_SECOND = 1000;

const staleTime = {
  SERVICE: {},
  ADMIN: {
    NEWS_LIST: {
      PAGE_INFO: ONE_SECOND * 60 * 60,
      ALL_WITH_PAGINATION: ONE_SECOND * 120,
    },
  },
};

export default staleTime;
