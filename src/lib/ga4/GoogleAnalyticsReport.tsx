"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Plus } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components";
import { type GAReportRow, useGoogleAnalyticsReport } from "@/hooks";
import {
  monthOfToday,
  todayStr,
  yearOfToday,
  yesterdayStr,
} from "@/utils/date";
import { chartConfig, getChartData } from "@/utils/chart";
import { getDimensionValues, getMetricValues } from "./util";

export default function GoogleAnalyticsReport() {
  const { data } = useGoogleAnalyticsReport();

  // 오늘 데이터를 GA에서 아직 수집하지 못한 경우, 어제의 방문자 수를 수집해서 보여주도록
  const todayVisitors = (
    data?.daily?.rows.find(
      (row) => row?.dimensionValues[0].value === todayStr,
    ) ??
    data?.daily?.rows.find(
      (row) => row?.dimensionValues[0].value === yesterdayStr,
    )
  )?.metricValues.map(({ value }) => value);

  const todayActiveUsers = todayVisitors?.[0];
  const todayHomePageClicks = todayVisitors?.[1];
  const todayStayUsers = todayVisitors?.[2];

  const getThisWeekVisitors = (data: GAReportRow[], index: number) =>
    data
      ?.map(({ metricValues }) => metricValues)
      .map((metricValue) => metricValue[index].value)
      .reduce((prev, curr) => +prev + +curr, 0);

  const [thisWeekActiveUsers, thisWeekHomePageClicks, thisWeekStayUsers] = [
    getThisWeekVisitors(data?.daily?.rows, 0),
    getThisWeekVisitors(data?.daily?.rows, 1),
    getThisWeekVisitors(data?.daily?.rows, 2),
  ];

  const dailyChartData = getChartData(
    getDimensionValues(data, "daily"),
    getMetricValues(data, "daily"),
  );
  const weeklyChartData = getChartData(
    getDimensionValues(data, "weekly"),
    getMetricValues(data, "weekly"),
  );
  const monthlyChartData = getChartData(
    getDimensionValues(data, "monthly"),
    getMetricValues(data, "monthly"),
  );

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 p-4 border border-muted rounded-md">
          <span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">
            Today
          </span>
          <ul className="grid grid-cols-3 gap-3">
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Visitors</span>
              <div className="ui-flex-center gap-2 py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                <Plus strokeWidth={"3"} size={20} /> {todayActiveUsers}
              </div>
            </li>
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Clicks</span>
              <span className="py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                {todayHomePageClicks}
              </span>
            </li>
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Sessions</span>
              <span className="py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                {todayStayUsers}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 p-4 border border-muted rounded-md">
          <span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">
            This Week
          </span>
          <ul className="grid grid-cols-3 gap-3">
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Visitors</span>
              <div className="ui-flex-center gap-2 py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                <Plus strokeWidth={"3"} size={20} /> {thisWeekActiveUsers}
              </div>
            </li>
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Clicks</span>
              <span className="py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                {thisWeekHomePageClicks}
              </span>
            </li>
            <li className="col-span-1 flex flex-col justify-between gap-3">
              <span className="text-base font-semibold">Sessions</span>
              <span className="py-1.5 px-3 w-fit bg-light font-black text-gray-600 text-2xl rounded-lg">
                {thisWeekStayUsers}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
        <div className="grid grid-cols-1 gap-4 p-4 border border-muted rounded-lg">
          <h4 className="ui-flex-center-between font-semibold">
            <div className="text-sm whitespace-normal sm:whitespace-nowrap">
              <span>
                {yearOfToday}년 {monthOfToday}월
              </span>{" "}
              <span>일별 방문자 / 클릭 / 세션 현황</span>
            </div>
            <span className="inline-block muted-gray-label text-xs">Daily</span>
          </h4>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={dailyChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(4)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="visitor" fill="var(--color-visitor)" radius={4} />
              <Bar dataKey="click" fill="var(--color-click)" radius={4} />
              <Bar dataKey="session" fill="var(--color-session)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 border border-muted rounded-lg">
          <h4 className="ui-flex-center-between font-semibold text-sm whitespace-normal sm:whitespace-nowrap">
            {yearOfToday}년 최근 3개월 주차별 방문자 / 클릭 / 세션 현황
            <span className="inline-block muted-gray-label text-xs">
              Weekly
            </span>
          </h4>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={weeklyChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value + " week"}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="visitor" fill="var(--color-visitor)" radius={4} />
              <Bar dataKey="click" fill="var(--color-click)" radius={4} />
              <Bar dataKey="session" fill="var(--color-session)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 border border-muted rounded-lg">
          <h4 className="ui-flex-center-between font-semibold">
            <div className="text-sm whitespace-normal sm:whitespace-nowrap">
              <span className="font-bold underline">{yearOfToday}년</span> 월별
              방문자 / 클릭 / 세션 현황
            </div>
            <span className="inline-block muted-gray-label text-xs">
              Monthly
            </span>
          </h4>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={monthlyChartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value + " week"}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="visitor" fill="var(--color-visitor)" radius={4} />
              <Bar dataKey="click" fill="var(--color-click)" radius={4} />
              <Bar dataKey="session" fill="var(--color-session)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </>
  );
}
