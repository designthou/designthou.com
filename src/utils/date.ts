import { format, toZonedTime } from 'date-fns-tz';

const koreaTimeZone = 'Asia/Seoul';

type Month = (typeof months)[number];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

const today = new Date();
const todayLocaleString = today.toLocaleString('en-US', {
	timeZone: koreaTimeZone,
});

const [yearOfToday, monthOfToday, dateOfToday] = [today.getFullYear(), today.getMonth() + 1, today.getDate()];

const todayStr = `${yearOfToday}${(monthOfToday + '').padStart(2, '0')}${(dateOfToday + '').padStart(2, '0')}`;

const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const [yearOfYesterday, monthOfYesterday, dateOfYesterday] = [yesterday.getFullYear(), yesterday.getMonth() + 1, yesterday.getDate()];

const yesterdayStr = `${yearOfYesterday}${(monthOfYesterday + '').padStart(2, '0')}${(dateOfYesterday + '').padStart(2, '0')}`;

const formatDate = (_date: Date) => {
	const [year, month, date] = [_date.getFullYear(), _date.getMonth() + 1, _date.getDate()];

	return `${year}.${(month + '').padStart(2, '0')}.${(date + '').padStart(2, '0')}`;
};

const formatByKoreanTime = (targetDate: Date | string): string => {
	const _date = typeof targetDate === 'string' || targetDate instanceof Date ? new Date(targetDate) : targetDate;

	const formattedDate = format(toZonedTime(_date, koreaTimeZone), 'yyyy/MM/dd', { timeZone: koreaTimeZone });

	return formattedDate;
};

const formatByISOKoreanTime = (targetDate: Date | string): string => {
	const _date = typeof targetDate === 'string' || targetDate instanceof Date ? new Date(targetDate) : targetDate;

	const formattedDate = format(toZonedTime(_date, koreaTimeZone), 'yyyy-MM-dd', { timeZone: koreaTimeZone });

	return formattedDate;
};

const formatDateUS = (date?: Date) => {
	if (!date) {
		return '';
	}
	return date.toLocaleDateString('en-US', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	});
};

const isValidDate = (date?: Date) => {
	if (!date) {
		return false;
	}
	return !isNaN(date.getTime());
};

const translateNumberIntoMonth = (month: number) => months[month]; // ['Jan', 'Feb', 'Mar'][number]
const getMonthIndexFromMonths = (option: Month | null) => months.findIndex(month => month === option);

const getDateFromString = (dateString: string): Date => {
	return new Date(dateString);
};

const getNextDay = (date: Date | string) => {
	const _date = typeof date === 'string' || date instanceof Date ? new Date(date) : date;

	_date.setDate(_date.getDate() + 1);

	return _date.toISOString();
};

const getNextMonthFormatDate = (usageDate: Date | string) => {
	const _date = typeof usageDate === 'string' ? new Date(usageDate) : usageDate;
	const koreaDate = toZonedTime(_date, koreaTimeZone);
	const [month, date] = [koreaDate.getMonth(), koreaDate.getDate()];

	return `${((month + 2 > 12 ? month + 2 - 12 : month + 2) + '').padStart(2, '0')}/${(date + '').padStart(2, '0')}`;
};

type TimePeriod = 'Morning' | 'Afternoon' | 'Evening' | 'Late Night';

const greetingMap: Record<TimePeriod, string> = {
	Morning: 'Good Morning ☀️',
	Afternoon: 'Good Afternoon 🙂',
	Evening: 'Good Evening 🌙',
	'Late Night': 'Cheer up, Late Night',
};

const getTimePeriodByTimezone = (timeZone: string, now: number = Date.now()): TimePeriod => {
	const hour = new Intl.DateTimeFormat('en-US', {
		timeZone,
		hour: 'numeric',
		hour12: false,
	})
		.formatToParts(new Date(now))
		.find(p => p.type === 'hour')!.value;

	const h = Number(hour);

	if (h >= 5 && h < 12) return 'Morning';
	if (h >= 12 && h < 18) return 'Afternoon';
	if (h >= 18 && h < 22) return 'Evening';
	return 'Late Night';
};

export type { Month };
export {
	today,
	todayLocaleString,
	todayStr,
	yesterdayStr,
	yearOfToday,
	monthOfToday,
	dateOfToday,
	months,
	formatDate,
	formatByKoreanTime,
	formatByISOKoreanTime,
	formatDateUS,
	isValidDate,
	translateNumberIntoMonth,
	getMonthIndexFromMonths,
	getDateFromString,
	getNextDay,
	getNextMonthFormatDate,
	greetingMap,
	getTimePeriodByTimezone,
};
