import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

interface GAReportRow {
  dimensionValues: { value: string }[];
  metricValues: { value: string }[];
}

interface GAReportResponse {
  rows: GAReportRow[];
}

const OAUTH_TOKEN_REQUEST_URL = "https://accounts.google.com/o/oauth2/token";
const ACCESS_GA_REPORT_URL =
  "https://analyticsdata.googleapis.com/v1beta/properties";

async function fetchGoogleAnalyticsReport(): Promise<GAReportResponse> {
  try {
    const tokenResponse = await axios.post(OAUTH_TOKEN_REQUEST_URL, {
      client_id: process.env.GA_OAUTH_CLIENT_ID,
      client_secret: process.env.GA_OAUTH_CLIENT_SECRET,
      refresh_token: process.env.GA_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    const accessToken = tokenResponse.data.access_token;

    const reportResponse = await axios.post(
      `${ACCESS_GA_REPORT_URL}/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}:runReport`,
      {
        dimensions: [{ name: "date" }],
        metrics: [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "sessions" },
        ],
        dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
        keepEmptyRows: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return reportResponse.data;
    // if (reportResponse.status === 200) {
    //   return reportResponse.data;
    // }
  } catch (error: unknown) {
    throw error;
  }
}

const useGoogleAnalyticsReport = () => {
  return useSuspenseQuery({
    queryKey: ["ga4"],
    queryFn: fetchGoogleAnalyticsReport,
  });
};

export type { GAReportResponse, GAReportRow };
export { useGoogleAnalyticsReport };
