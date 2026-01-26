import React from 'react';
import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';
import { BadgeCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import {
	Badge,
	Button,
	Checkbox,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components';
import { convertSupabaseDateToShortHumanReadable } from '@/lib/supabase';
import { OfflineStudentView } from '@/types';
import { cn } from '@/lib/utils';

export default function OfflineStudentsTable({
	data,
	searchValue,
}: {
	data: OfflineStudentView[];
	searchValue: { email: string; name: string };
}) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 20,
	});

	const columns: ColumnDef<OfflineStudentView>[] = React.useMemo(
		() => [
			{
				id: 'select',
				header: ({ table }) => (
					<div className="flex items-center justify-center">
						<Checkbox
							checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
							onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
							aria-label="Select all"
						/>
					</div>
				),
				cell: ({ row }) => (
					<div className="flex items-center justify-center">
						<Checkbox checked={row.getIsSelected()} onCheckedChange={value => row.toggleSelected(!!value)} aria-label="Select row" />
					</div>
				),
			},
			{
				accessorKey: 'name',
				header: () => <span>이 름</span>,
				cell: ({ row }) => (
					<span
						className={cn(
							'px-2 py-1',
							row?.original?.name === 'unknown' ? 'bg-muted text-gray-600 border-dotted border-gray-300 rounded-full' : '',
						)}>
						{row?.original?.name}
					</span>
				),
			},
			{
				accessorKey: 'email',
				header: () => <span>이메일</span>,
				cell: ({ row }) => (
					<Badge variant="outline" className="text-muted-foreground px-1.5">
						<BadgeCheck className={row?.original?.email ? 'fill-green-500 dark:fill-green-400' : ''} />
						{row?.original?.email}
					</Badge>
				),
			},

			{
				accessorKey: 'category',
				header: () => <span>카테고리</span>,
				cell: ({ row }) => (
					<Badge variant="outline" className="text-muted-foreground px-1.5">
						<BadgeCheck className={row?.original?.category ? 'fill-orange-500 dark:fill-orange-400' : ''} />
						{row?.original?.category}
					</Badge>
				),
			},
			{
				accessorKey: 'class',
				header: () => <span>클래스</span>,
				cell: ({ row }) => <span>{row?.original?.class}</span>,
			},
			{
				accessorKey: 'phoneEncrypted',
				header: () => <span>전화번호(암호화)</span>,
				cell: ({ row }) => <span>{row?.original?.phoneEncrypted}</span>,
			},
			{
				accessorKey: 'phoneMask',
				header: () => <span>전화번호(마스킹)</span>,
				cell: ({ row }) => <span>{row?.original?.phoneMask}</span>,
			},
			{
				accessorKey: 'createdAt',
				header: () => <span>생성일</span>,
				cell: ({ row }) => <span>{convertSupabaseDateToShortHumanReadable(row?.original?.createdAt)}</span>,
			},
			{
				accessorKey: 'updatedAt',
				header: () => <span>업데이트 날짜</span>,
				cell: ({ row }) => <span>{convertSupabaseDateToShortHumanReadable(row?.original?.updatedAt)}</span>,
			},
		],
		[],
	);

	const filteredData = React.useMemo(() => {
		const email = searchValue.email.trim().toLowerCase();
		const name = searchValue.name.trim().toLowerCase();

		return data.filter(row => {
			if (email && !row?.email?.toLowerCase().includes(email)) return false;
			if (name && !row?.name?.toLowerCase().includes(name)) return false;
			return true;
		});
	}, [data, searchValue.email, searchValue.name]);

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data: filteredData,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		getRowId: row => row?.id.toString(),
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		onSortingChange: setSorting,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
	});
	return (
		<>
			<Table className="w-full table-fixed border border-muted rounded-lg">
				<TableHeader className="bg-muted sticky top-0 z-10">
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableHead key={header.id} className="font-medium min-w-0 truncate">
									{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>

				<TableBody className="**:data-[slot=table-cell]:first:w-8">
					{table.getRowModel().rows?.length ? (
						<>
							{table.getRowModel().rows.map(row => (
								<TableRow key={row.id} className="h-4">
									{row.getVisibleCells().map(cell => (
										<TableCell key={cell.id} className="min-w-0 truncate">
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</>
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="ui-flex-center-between mt-3 p-4 bg-light border border-muted rounded-lg">
				<div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
					{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
				<div className="flex w-full items-center gap-8 lg:w-fit">
					<div className="hidden items-center gap-2 lg:flex">
						<Label htmlFor="rows-per-page" className="text-sm font-medium">
							Rows per page
						</Label>
						<Select
							value={`${table.getState().pagination.pageSize}`}
							onValueChange={value => {
								table.setPageSize(Number(value));
							}}>
							<SelectTrigger size="sm" className="w-20" id="rows-per-page">
								<SelectValue placeholder={table.getState().pagination.pageSize} />
							</SelectTrigger>
							<SelectContent side="top">
								{[10, 20, 30, 40, 50].map(pageSize => (
									<SelectItem key={pageSize} value={`${pageSize}`}>
										{pageSize}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="flex w-fit items-center justify-center text-sm font-medium">
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</div>
					<div className="ml-auto flex items-center gap-2 lg:ml-0">
						<Button
							variant="outline"
							className="hidden h-8 w-8 p-0 lg:flex"
							onClick={() => table.setPageIndex(0)}
							disabled={!table.getCanPreviousPage()}>
							<span className="sr-only">Go to first page</span>
							<ChevronLeft />
						</Button>
						<Button
							variant="outline"
							className="size-8"
							size="icon"
							onClick={() => table.previousPage()}
							disabled={!table.getCanPreviousPage()}>
							<span className="sr-only">Go to previous page</span>
							<ChevronLeft />
						</Button>
						<Button variant="outline" className="size-8" size="icon" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
							<span className="sr-only">Go to next page</span>
							<ChevronRight />
						</Button>
						<Button
							variant="outline"
							className="hidden size-8 lg:flex"
							size="icon"
							onClick={() => table.setPageIndex(table.getPageCount() - 1)}
							disabled={!table.getCanNextPage()}>
							<span className="sr-only">Go to last page</span>
							<ChevronRight />
						</Button>
					</div>
				</div>
			</div>
		</>
	);
}
