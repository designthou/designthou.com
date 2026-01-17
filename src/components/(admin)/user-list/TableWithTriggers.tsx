'use client';

import React from 'react';
import { Badge, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components';
import { RegisteredUserTable, LegacyUserTable } from '@/components';
import { RegisteredUserViewSchema, LegacyUserViewSchema } from '@/types/schemaMapper';

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

	return (
		<Tabs defaultValue="registered-users" className="py-4 w-full flex-col justify-start gap-4">
			<div className="flex items-center justify-between">
				<Label htmlFor="view-selector" className="sr-only">
					View
				</Label>
				<TabsList>
					{triggers.map(({ value, label, dataLength }) => (
						<TabsTrigger key={label} value={value}>
							{label} <Badge variant="default">{dataLength}</Badge>
						</TabsTrigger>
					))}
				</TabsList>
			</div>
			<TabsContent value="registered-users" className="relative flex flex-col gap-4 overflow-auto">
				<RegisteredUserTable data={registeredUsers} />
			</TabsContent>
			<TabsContent value="legacy-users" className="relative flex flex-col gap-4 overflow-auto">
				<LegacyUserTable data={legacyUsers} />
			</TabsContent>
		</Tabs>
	);
}
