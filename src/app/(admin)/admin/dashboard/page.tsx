"use client";

import dynamic from "next/dynamic";
import React from "react";
import { AnimateLoader } from "@/components";
import { dateOfToday, monthOfToday, yearOfToday } from "@/utils/date";

/**
 * HydrationBoundary of React Query vs Dynamic Import with NON-SSR
 * No need to make SuspenseGAReport. if you make HydrationBoundary, it means you must get initialData like using prefetchQuery to show ui with data right away. But we just need to wait Google APIs return data
 *
 */
const GAReport = dynamic(() => import("@/lib/ga4/GoogleAnalyticsReport"), {
  ssr: false,
  loading: () => (
    <div className="ui-flex-center mt-3 w-full h-1/2 bg-gray-100 rounded-lg">
      <AnimateLoader />
    </div>
  ),
});

export default function DashboardPage() {
  return (
    <section className="p-4">
      <h2 className="text-lg font-bold">Dashboard</h2>
      <div className="mt-4 p-1.5 w-fit bg-gradient-blue-100 text-white font-bold border border-muted rounded-lg">
        {`${yearOfToday}`} <span>년</span> {`${monthOfToday}`} <span>월</span>{" "}
        {`${dateOfToday}`} <span>일</span>
      </div>
      <GAReport />
    </section>
  );
}
