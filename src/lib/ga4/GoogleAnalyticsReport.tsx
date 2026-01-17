'use client';

import { Bar, BarChart, Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Plus } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components';
import { type GAReportRow, useGoogleAnalyticsReport } from '@/hooks';
import { todayStr, yearOfToday, yesterdayStr } from '@/utils/date';
import { chartConfig, getChartData } from '@/utils/chart';
import { getDimensionValues, getMetricValues } from './util';

export default function GoogleAnalyticsReport() {
	const { data } = useGoogleAnalyticsReport();

	// 오늘 데이터를 GA에서 아직 수집하지 못한 경우, 어제의 방문자 수를 수집해서 보여주도록
	const todayVisitors = (
		data?.daily?.rows.find(row => row?.dimensionValues[0].value === todayStr) ??
		data?.daily?.rows.find(row => row?.dimensionValues[0].value === yesterdayStr)
	)?.metricValues.map(({ value }) => value);

	const todayActiveUsers = todayVisitors?.[0];
	const todayHomePageClicks = todayVisitors?.[1];
	const todayStayUsers = todayVisitors?.[2];

	const getThisWeekVisitors = (data: GAReportRow[], index: number) =>
		data
			?.map(({ metricValues }) => metricValues)
			.map(metricValue => metricValue[index].value)
			.reduce((prev, curr) => +prev + +curr, 0);

	const [thisWeekActiveUsers, thisWeekHomePageClicks, thisWeekStayUsers] = [
		getThisWeekVisitors(data?.daily?.rows, 0),
		getThisWeekVisitors(data?.daily?.rows, 1),
		getThisWeekVisitors(data?.daily?.rows, 2),
	];

	const LAST_WEEK_NUMBER_ON_THE_YEAR = 52;
	const dailyChartData = getChartData(getDimensionValues(data, 'daily'), getMetricValues(data, 'daily'));
	const weeklyChartData = getChartData(getDimensionValues(data, 'weekly'), getMetricValues(data, 'weekly')).filter(
		data => +data.name < LAST_WEEK_NUMBER_ON_THE_YEAR,
	);
	const monthlyChartData = getChartData(getDimensionValues(data, 'monthly'), getMetricValues(data, 'monthly'));

	return (
		<>
			<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
				<div className="flex flex-col gap-4 p-4 border border-muted rounded-md">
					<span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">Today</span>
					<ul className="grid grid-cols-3 gap-3">
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Visitors</span>
							<div className="ui-flex-center gap-2 py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">
								<Plus strokeWidth={'3'} size={20} className="hidden sm:inline-block" /> {todayActiveUsers}
							</div>
						</li>
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Clicks</span>
							<span className="py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">
								{todayHomePageClicks}
							</span>
						</li>
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Sessions</span>
							<span className="py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">{todayStayUsers}</span>
						</li>
					</ul>
				</div>
				<div className="flex flex-col gap-4 p-4 border border-muted rounded-md">
					<span className="inline-block p-1.5 w-fit bg-black text-white border border-muted rounded-lg">This Week</span>
					<ul className="grid grid-cols-3 gap-3">
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Visitors</span>
							<div className="ui-flex-center gap-2 py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">
								<Plus strokeWidth={'3'} size={20} className="hidden sm:inline-block" /> {thisWeekActiveUsers}
							</div>
						</li>
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Clicks</span>
							<span className="py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">
								{thisWeekHomePageClicks}
							</span>
						</li>
						<li className="col-span-1 flex flex-col justify-between gap-3 p-3 border border-muted bg-light rounded-lg">
							<span className="text-base font-semibold">Sessions</span>
							<span className="py-1.5 px-3 w-fit bg-muted font-black text-gray-600 text-xl rounded-lg sm:text-2xl">
								{thisWeekStayUsers}
							</span>
						</li>
					</ul>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-start">
				<div className="grid grid-cols-1 gap-4 p-4 border border-muted rounded-lg lg:col-span-3">
					<h4 className="ui-flex-center-between gap-4 font-semibold">
						<div className="mr-2 text-sm whitespace-normal sm:whitespace-nowrap">
							<span className="p-1 bg-muted rounded-md">{`${dailyChartData[0].name} ~ ${dailyChartData.at(-1)?.name}`}</span>{' '}
							<span>일일 방문자 / 클릭 / 세션 현황</span>
						</div>
						<span className="inline-block muted-gray-label text-xs">Daily</span>
					</h4>

					<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
						<AreaChart data={dailyChartData}>
							<defs>
								<linearGradient id="fillVisitor" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="fillClick" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-chart-4)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-chart-4)" stopOpacity={0.1} />
								</linearGradient>
								<linearGradient id="fillSession" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="var(--color-chart-5)" stopOpacity={0.8} />
									<stop offset="95%" stopColor="var(--color-chart-5)" stopOpacity={0.1} />
								</linearGradient>
							</defs>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="name"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								minTickGap={32}
								tickFormatter={value => value.slice(4)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={value => value} indicator="dot" />} />
							<Area dataKey="visitor" type="natural" fill="url(#fillVisitor)" stroke="var(--color-chart-1)" stackId="a" />
							<Area dataKey="click" type="natural" fill="url(#fillClick)" stroke="var(--color-chart-4)" stackId="a" />
							<Area dataKey="session" type="natural" fill="url(#fillSession)" stroke="var(--color-chart-5)" stackId="a" />
							<ChartLegend content={<ChartLegendContent />} />
						</AreaChart>
					</ChartContainer>
				</div>
				<div className="flex flex-col gap-4 p-4 h-full border border-muted rounded-lg lg:col-span-2">
					<h4 className="ui-flex-center-between gap-4  font-semibold">
						<span className="text-sm whitespace-normal sm:whitespace-nowrap">{yearOfToday}년 주차별 방문자 / 클릭 / 세션 현황</span>
						<span className="inline-block muted-gray-label text-xs">Weekly</span>
					</h4>
					<ChartContainer config={chartConfig} className="flex-1 min-h-[200px] w-full lg:min-h-[400px]">
						<BarChart accessibilityLayer data={weeklyChartData}>
							<CartesianGrid vertical={false} />
							<XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={value => value + ' week'} />
							<ChartTooltip content={<ChartTooltipContent />} />
							<ChartLegend content={<ChartLegendContent />} />
							<Bar dataKey="visitor" fill="var(--color-visitor)" radius={4} />
							<Bar dataKey="click" fill="var(--color-click)" radius={4} />
							<Bar dataKey="session" fill="var(--color-session)" radius={4} />
						</BarChart>
					</ChartContainer>
				</div>
				<div className="flex flex-col gap-4 p-4 h-full border border-muted rounded-lg lg:col-span-1">
					<h4 className="ui-flex-center-between gap-4 font-semibold">
						<div className="text-sm whitespace-normal sm:whitespace-nowrap">월별 방문자 / 클릭 / 세션 현황</div>
						<span className="inline-block muted-gray-label text-xs">Monthly</span>
					</h4>
					<ChartContainer config={chartConfig} className="flex-1 min-h-[200px] w-full lg:min-h-[400px]">
						<BarChart accessibilityLayer data={monthlyChartData}>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="name"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={value => value.slice(0, 4) + '/' + value.slice(4)}
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
