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
    TIPS: "/tips",

    SETTINGS: {
      ROOT: "/settings",
      MYACCOUNT_PROFILE: "/settings/myaccount/profile",
      SUBSCRIPTION: "/settings/myaccount/subscription",
    },

    NOT_FOUND: "/*",
  },
  ADMIN: {
    ROOT: "/admin",
    DASHBOARD: "/admin/dashboard",
    NEWS: "/admin/news",
    COMPETITION: "/admin/competition",
    TIPS: "/admin/tips",
  },
};

export default route;
