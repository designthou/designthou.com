const API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DESIGNTHOU_PRODUCTION_BASE_URL
    : process.env.DESIGNTHOU_DEV_BASE_URL;
export { API_URL };
