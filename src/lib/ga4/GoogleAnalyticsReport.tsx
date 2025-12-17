"use client";

import { SquareUserRound } from "lucide-react";
import { type GAReportRow, useGoogleAnalyticsReport } from "@/hooks";
import {
  dateOfToday,
  monthOfToday,
  todayStr,
  yearOfToday,
  yesterdayStr,
} from "@/utils/date";

export default function GoogleAnalyticsReport() {
  const { data } = useGoogleAnalyticsReport();

  // 오늘 데이터를 GA에서 아직 수집하지 못한 경우
  // 어제의 방문자 수를 수집해서 보여주도록
  const todayVisitors = (
    data?.rows.find((row) => row?.dimensionValues[0].value === todayStr) ??
    data?.rows.find((row) => row?.dimensionValues[0].value === yesterdayStr)
  )?.metricValues.map(({ value }) => value);

  const getThisWeekVisitors = (data: GAReportRow[], index: number) =>
    data
      ?.map(({ metricValues }) => metricValues)
      .map((metricValue) => metricValue[index].value)
      .reduce((prev, curr) => +prev + +curr, 0);

  const todayActiveUsers = todayVisitors?.[0];
  const todayHomePageClicks = todayVisitors?.[1];
  const todayStayUsers = todayVisitors?.[2];

  const [thisWeekActiveUsers, thisWeekHomePageClicks, thisWeekStayUsers] = [
    getThisWeekVisitors(data?.rows, 0),
    getThisWeekVisitors(data?.rows, 1),
    getThisWeekVisitors(data?.rows, 2),
  ];

  return (
    <div className="flex flex-col gap-6 mt-6 w-full">
      <h3 className="flex items-center gap-2 font-semibold">
        <SquareUserRound size={18} />
        <span>사용자 이용 현황</span>
      </h3>
      <div className="grid grid-cols-1 p-4 border border-muted rounded-md sm:grid-cols-2">
        <div className="flex flex-col gap-3">
          <span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">
            Today
          </span>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <span>방문자</span>
              <span className="py-1.5 px-3bg-light text-gray-600 rounded-lg">
                {todayActiveUsers}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span>홈페이지 클릭</span>
              <span className="py-1.5 px-3 bg-light text-gray-600 rounded-lg">
                {todayHomePageClicks}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span>세션</span>
              <span className="py-1.5 px-3 bg-light text-gray-600 rounded-lg">
                {todayStayUsers}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3">
          <span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">
            This Week
          </span>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-3">
              <span>방문자</span>
              <span className="py-1.5 px-3bg-light text-gray-600 rounded-lg">
                {thisWeekActiveUsers}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span>홈페이지 클릭</span>
              <span className="py-1.5 px-3bg-light text-gray-600 rounded-lg">
                {thisWeekHomePageClicks}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span>세션</span>
              <span className="py-1.5 px-3bg-light text-gray-600 rounded-lg">
                {thisWeekStayUsers}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <p>
          * <span>세션</span>은 한 사용자(특정 id 소유)가 홈페이지에 진입하여{" "}
          <span>특정 시간</span> 동안 머무르고 활동을 멈춘 이후, 다시 진입한
          사용자일 경우 +1로 카운팅합니다.
        </p>
        <p>
          * <span>특정 시간</span>이란 30분을 의미합니다.{" "}
        </p>
      </div>
    </div>
  );
}
