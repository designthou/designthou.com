'use client';

import React from 'react';
import { Funnel, RotateCcw } from 'lucide-react';
import {
	Badge,
	Button,
	Input,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
	OfflineStudentsTable,
} from '@/components';
import { OfflineStudentView } from '@/types';

export default function TableWithTriggers({ offlineStudents }: { offlineStudents: OfflineStudentView[] }) {
	const triggers = [{ value: 'offline-students', label: 'Offline Students', dataLength: offlineStudents?.length }];
	const [searchValue, setSearchValue] = React.useState({ email: '', name: '' });
	const deferredSearchValue = React.useDeferredValue(searchValue);

	return (
		<Tabs defaultValue="offline-students" className="py-4 w-full flex-col justify-start gap-4">
			<div className="flex items-center justify-between">
				<Label htmlFor="view-selector" className="sr-only">
					Offline Students List
				</Label>
				<TabsList>
					{triggers.map(({ value, label, dataLength }) => (
						<TabsTrigger key={label} value={value}>
							{label} <Badge variant="default">{dataLength}</Badge>
						</TabsTrigger>
					))}
				</TabsList>
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="outline">
							<Funnel size={18} />
							검색 필터
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="leading-none font-semibold">검색 필터</h4>
								<p className="text-muted-foreground text-xs">이메일, 이름 등으로 검색 가능합니다.</p>
							</div>
							<div className="grid gap-2">
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										placeholder="designthou@gmail.com"
										value={searchValue.email}
										onChange={e => setSearchValue({ ...searchValue, email: e.target.value })}
										className="col-span-2 h-8"
									/>
								</div>
								<div className="grid grid-cols-3 items-center gap-4">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										placeholder="디자인도우"
										value={searchValue.name}
										onChange={e => setSearchValue({ ...searchValue, name: e.target.value })}
										className="col-span-2 h-8"
									/>
								</div>
							</div>
							<Button type="button" size="sm" onClick={() => setSearchValue({ email: '', name: '' })}>
								<RotateCcw />
								초기화
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>

			<TabsContent value="offline-students" className="relative flex flex-col gap-4 overflow-auto">
				<OfflineStudentsTable data={offlineStudents} searchValue={deferredSearchValue} />
			</TabsContent>
		</Tabs>
	);
}
