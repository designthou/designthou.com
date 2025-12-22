import { GAReportResponse } from "@/hooks";

const getDimensionValues = (
  data: GAReportResponse,
  type: "daily" | "weekly" | "monthly",
) => data?.[type]?.rows?.map((row) => row.dimensionValues[0].value);

const getMetricValues = (
  data: GAReportResponse,
  type: "daily" | "weekly" | "monthly",
) => data?.[type]?.rows?.map(({ metricValues }) => metricValues);

export { getDimensionValues, getMetricValues };
