import { useSuspenseQuery } from "@tanstack/react-query";

interface GAReportRow {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

interface GAReportResponse {
  rows: GAReportRow[];
}

const useGoogleAnalyticsReport = () => {
  return useSuspenseQuery({
    queryKey: ["ga4-report"],
    queryFn: async (): Promise<GAReportResponse> => {
      const response = await fetch(`/api/admin/ga4/report`);
      if (!response.ok) throw new Error("[FAIL] GA Report read");

      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1분 캐시
  });
};

export type { GAReportResponse, GAReportRow };
export { useGoogleAnalyticsReport };
