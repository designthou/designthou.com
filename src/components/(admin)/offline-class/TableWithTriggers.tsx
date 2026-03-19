'use client';

import React from 'react';
import { Funnel, RotateCcw } from 'lucide-react';
import { Button, Input, Label, Popover, PopoverContent, PopoverTrigger, OfflineClassTable } from '@/components';
import { OfflineCourseStudentView } from '@/types';

export default function TableWithTriggers({ initialData }: { initialData: OfflineCourseStudentView[] }) {
	const [searchValue, setSearchValue] = React.useState({ email: '', name: '' });
	const deferredSearchValue = React.useDeferredValue(searchValue);

	return (
		<div className="flex flex-col gap-4 mt-4 w-full">
			<Label htmlFor="view-selector" className="sr-only">
				Offline Course Student List
			</Label>

			<div className="ui-flex-center-between gap-4">
				<div className="ui-flex-center p-4 w-6 h-6 text-2xl font-bold text-white bg-gradient-blue-100 rounded-full">
					{initialData.length}
				</div>
				<Popover>
					<PopoverTrigger asChild className="ml-auto">
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
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="email" className="col-span-1">
										Email
									</Label>
									<Input
										id="email"
										placeholder="designthou@gmail.com"
										value={searchValue.email}
										onChange={e => setSearchValue({ ...searchValue, email: e.target.value })}
										className="col-span-3 h-8"
									/>
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="col-span-1">
										Name
									</Label>
									<Input
										id="name"
										placeholder="디자인도우"
										value={searchValue.name}
										onChange={e => setSearchValue({ ...searchValue, name: e.target.value })}
										className="col-span-3 h-8"
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

			<OfflineClassTable data={initialData} searchValue={deferredSearchValue} />
		</div>
	);
}
