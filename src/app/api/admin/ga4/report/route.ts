import { NextResponse } from "next/server";
import axios from "axios";

class GAError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = "GAError";
    this.status = status;
    this.data = data;
  }
}

const OAUTH_TOKEN_REQUEST_URL = "https://accounts.google.com/o/oauth2/token";
const ACCESS_GA_REPORT_URL =
  "https://analyticsdata.googleapis.com/v1beta/properties";

export async function GET() {
  try {
    const tokenResponse = await axios.post(OAUTH_TOKEN_REQUEST_URL, {
      client_id: process.env.GA_OAUTH_CLIENT_ID,
      client_secret: process.env.GA_OAUTH_CLIENT_SECRET,
      refresh_token: process.env.GA_OAUTH_REFRESH_TOKEN,
      grant_type: "refresh_token",
    });

    const accessToken = tokenResponse.data.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token 발급 실패" },
        { status: 500 }
      );
    }

    const [fetchDailyReport, fetchWeeklyReport, fetchMonthlyReport] =
      await Promise.all([
        await axios.post(
          `${ACCESS_GA_REPORT_URL}/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}:runReport`,
          {
            dimensions: [{ name: "date" }],
            metrics: [
              { name: "activeUsers" },
              { name: "screenPageViews" },
              { name: "sessions" },
            ],
            dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
            keepEmptyRows: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        await axios.post(
          `${ACCESS_GA_REPORT_URL}/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}:runReport`,
          {
            dimensions: [{ name: "week" }],
            metrics: [
              { name: "activeUsers" },
              { name: "screenPageViews" },
              { name: "sessions" },
            ],
            dateRanges: [{ startDate: "90daysAgo", endDate: "today" }],
            keepEmptyRows: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
        await axios.post(
          `${ACCESS_GA_REPORT_URL}/${process.env.NEXT_PUBLIC_GA4_PROPERTY_ID}:runReport`,
          {
            dimensions: [{ name: "yearMonth" }],
            metrics: [
              { name: "activeUsers" },
              { name: "screenPageViews" },
              { name: "sessions" },
            ],
            dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
            keepEmptyRows: true,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        ),
      ]);

    if (
      fetchDailyReport.status === 200 &&
      fetchWeeklyReport.status === 200 &&
      fetchMonthlyReport.status === 200
    ) {
      return NextResponse.json({
        daily: fetchDailyReport.data,
        weekly: fetchWeeklyReport.data,
        monthly: fetchMonthlyReport.data,
      });
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new GAError(
        `[GA API Error] ${error.response?.status} ${error.message}`,
        error.response?.status,
        error.response?.data
      );
    }

    if (error instanceof Error) {
      throw new GAError(`[Unknown Error] ${error.message}`);
    }

    throw new GAError("Unknown GA Report Error happened");
  }
}
