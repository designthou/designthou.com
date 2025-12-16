const route = {
  AUTH: {
    ROOT: "/auth",
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  SERVICE: {
    ROOT: "/",
    NEWS: "/news",
    FREE_SOURCE: "/sources",
    COMPETITION: "/competition",
    SETTINGS: {
      SETTINGS: {
        ROOT: "/settings",
        MYACCOUNT_PROFILE: "/settings/myaccount/profile",
      },
    },
    NOT_FOUND: "/*",
  },
};

export default route;
