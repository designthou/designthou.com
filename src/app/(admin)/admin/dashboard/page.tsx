"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Asterisk } from "lucide-react";
import { GAReportSkeleton } from "@/components";
import { dateOfToday, monthOfToday, yearOfToday } from "@/utils/date";

/**
 * HydrationBoundary of React Query vs Dynamic Import with NON-SSR
 * No need to make SuspenseGAReport. if you make HydrationBoundary, it means you must get initialData like using prefetchQuery to show ui with data right away. But we just need to wait Google APIs return data
 *
 */
const GAReport = dynamic(() => import("@/lib/ga4/GoogleAnalyticsReport"), {
  ssr: false,
  loading: () => <GAReportSkeleton />,
});

export default function DashboardPage() {
  return (
    <section className="p-4 min-h-0 flex-1 overflow-y-auto">
      <div className="ui-flex-center-between">
        <h2
          className="font-black font-mono text-xl"
          aria-label="Dashboard Page Title"
        >
          Dashboard
        </h2>
        <div className="ml-auto p-1.5 w-fit bg-gradient-orange-100 text-white text-base font-bold border border-muted rounded-lg">
          {`${yearOfToday}`} <span>년</span> {`${monthOfToday}`} <span>월</span>{" "}
          {`${dateOfToday}`} <span>일</span>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-6 w-full">
        <GAReport />
      </div>
      <div className="flex flex-col gap-3 mt-4 p-4 bg-light rounded-lg">
        <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
          <Asterisk size={15} className="min-w-4" />
          <p>
            <span>세션</span>은 한 사용자(특정 id 소유)가 홈페이지에 진입하여{" "}
            <span>특정 시간</span> 동안 머무르고 활동을 멈춘 이후, 다시 진입한
            사용자일 경우 +1로 카운팅합니다.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 font-semibold">
          <Asterisk size={15} className="min-w-4" />
          <p>
            <span>특정 시간</span>이란 30분을 의미합니다.
          </p>
        </div>
      </div>
    </section>
  );
}
