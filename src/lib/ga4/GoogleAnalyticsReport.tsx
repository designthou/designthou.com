"use client";

import { type GAReportRow, useGoogleAnalyticsReport } from "@/hooks";
import {
  dateOfToday,
  monthOfToday,
  todayStr,
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
      .map(({ metricValues }) => metricValues)
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
    <div>
      <h2>Designthou</h2>
      <div>
        {`${monthOfToday}`} <span>월</span> {`${dateOfToday}`} <span>일</span>
      </div>
      <div>
        <h3>사용자 이용 현황</h3>
        <div>
          <div>
            <h6>Today</h6>
            <ul>
              <li>
                <span>방문자</span>
                <span>{todayActiveUsers}</span>
              </li>
              <li>
                <span>홈페이지 클릭</span>
                <span>{todayHomePageClicks}</span>
              </li>
              <li>
                <span>세션</span>
                <span>{todayStayUsers}</span>
              </li>
            </ul>
          </div>
          <div>
            <h6>This Week</h6>
            <ul>
              <li>
                <span>방문자</span>
                <span>{thisWeekActiveUsers}</span>
              </li>
              <li>
                <span>홈페이지 클릭</span>
                <span>{thisWeekHomePageClicks}</span>
              </li>
              <li>
                <span>세션</span>
                <span>{thisWeekStayUsers}</span>
              </li>
            </ul>
          </div>
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
