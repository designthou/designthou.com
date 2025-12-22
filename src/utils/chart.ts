import { type ChartConfig } from "@/components";
import { GAReportRow } from "@/hooks";

const chartConfig = {
  visitor: {
    label: "visitor",
    color: "var(--chart-1)",
  },
  click: {
    label: "click",
    color: "var(--chart-4)",
  },
  session: {
    label: "session",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const getChartData = (
  dimensionValues: string[],
  metricValues: GAReportRow["metricValues"][],
) =>
  dimensionValues
    .map((dimensionValue, idx) => ({
      name: dimensionValue,
      visitor: +metricValues[idx][0].value,
      click: +metricValues[idx][1].value,
      session: +metricValues[idx][2].value,
    }))
    .sort((prev, curr) => +prev.name - +curr.name);

export { chartConfig, getChartData };
