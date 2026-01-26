import { BookMarked, LayoutDashboard, LayoutList, MonitorPlay, Newspaper, Palette, SquareChartGantt, User2, Youtube } from 'lucide-react';
import route from './route';

const linkWithRoutes = [
	{
		title: 'Dashboard',
		to: route.ADMIN.DASHBOARD,
		icon: <LayoutDashboard size={18} />,
	},
	{
		title: 'Reviews',
		to: route.ADMIN.REVIEWS,
		icon: <SquareChartGantt size={18} />,
	},
	{
		title: 'News',
		to: route.ADMIN.NEWS,
		icon: <Newspaper size={18} />,
	},
	{
		title: 'Youtube Tips',
		to: route.ADMIN.TIPS,
		icon: <Youtube size={18} />,
	},
	{
		title: 'Online Course',
		to: route.ADMIN.ONLINE_COURSE,
		icon: <MonitorPlay size={18} />,
	},
	{
		title: 'Open Source',
		to: route.ADMIN.FREE_SOURCE,
		icon: <Palette size={18} />,
	},
	{
		title: 'Competitons',
		to: route.ADMIN.COMPETITION,
		icon: <LayoutList size={18} />,
	},
] as const;

const linkWithManagableRoutes = [
	{
		title: 'User Table',
		to: route.ADMIN.USERS,
		icon: <User2 size={18} />,
	},
	{
		title: 'Offline Students',
		to: route.ADMIN.OFFLINE_STUDENTS,
		icon: <BookMarked size={18} />,
	},
];

export { linkWithRoutes, linkWithManagableRoutes };
