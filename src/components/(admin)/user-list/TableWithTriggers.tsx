'use client';

import React from 'react';
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
} from '@/components';
import { RegisteredUserTable, LegacyUserTable } from '@/components';
import { RegisteredUserViewSchema, LegacyUserViewSchema } from '@/types/schemaMapper';
import { RotateCcw } from 'lucide-react';

export default function TableWithTriggers({
	registeredUsers,
	legacyUsers,
}: {
	registeredUsers: RegisteredUserViewSchema[];
	legacyUsers: LegacyUserViewSchema[];
}) {
	const triggers = [
		{ value: 'registered-users', label: 'Registered Users', dataLength: registeredUsers?.length },
		{ value: 'legacy-users', label: 'Legacy Users', dataLength: legacyUsers?.length },
	];
	const [searchValue, setSearchValue] = React.useState({ email: '', nickname: '' });
	const deferredSearchValue = React.useDeferredValue(searchValue);

	return (
		<Tabs defaultValue="registered-users" className="py-4 w-full flex-col justify-start gap-4">
			<div className="flex items-center justify-between">
				<Label htmlFor="view-selector" className="sr-only">
					User List
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
						<Button variant="outline">검색 필터</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="grid gap-4">
							<div className="space-y-2">
								<h4 className="leading-none font-semibold">검색 필터</h4>
								<p className="text-muted-foreground text-xs">이메일, 닉네임 등으로 검색 가능합니다.</p>
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
									<Label htmlFor="nickname">Nickname</Label>
									<Input
										id="nickname"
										placeholder="designthou"
										value={searchValue.nickname}
										onChange={e => setSearchValue({ ...searchValue, nickname: e.target.value })}
										className="col-span-2 h-8"
									/>
								</div>
							</div>
							<Button type="button" size="sm" onClick={() => setSearchValue({ email: '', nickname: '' })}>
								<RotateCcw />
								초기화
							</Button>
						</div>
					</PopoverContent>
				</Popover>
			</div>
			<TabsContent value="registered-users" className="relative flex flex-col gap-4 overflow-auto">
				<RegisteredUserTable data={registeredUsers} searchValue={deferredSearchValue} />
			</TabsContent>
			<TabsContent value="legacy-users" className="relative flex flex-col gap-4 overflow-auto">
				<LegacyUserTable data={legacyUsers} searchValue={deferredSearchValue} />
			</TabsContent>
		</Tabs>
	);
}
