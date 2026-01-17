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
import { BadgeCheck, Badge as BadgeNotCheck, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { RegisteredUserSchema } from '@/types';

export default function RegisteredUserTable({ data }: { data: RegisteredUserSchema[] }) {
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [pagination, setPagination] = React.useState({
		pageIndex: 0,
		pageSize: 10,
	});

	const columns: ColumnDef<RegisteredUserSchema>[] = [
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
			accessorKey: 'role',
			header: () => <span>역할</span>,
			cell: ({ row }) => (
				<Badge variant="outline" className="text-muted-foreground px-1.5">
					{row.original.role !== 'user' ? <BadgeCheck className="fill-green-500 dark:fill-green-400" /> : <BadgeNotCheck />}
					{row.original.role}
				</Badge>
			),
		},
		{
			accessorKey: 'legacy_user_id',
			header: () => <span>기존 레거시 ID</span>,
			cell: ({ row }) => <span>{row.original.legacy_user_id}</span>,
		},
		{ accessorKey: 'nickname', header: () => <span>닉네임</span>, cell: ({ row }) => <span>{row.original.nickname}</span> },
		{
			accessorKey: 'display_name',
			header: () => <span>별명</span>,
			cell: ({ row }) => <span>{row.original.display_name}</span>,
		},
		{
			accessorKey: 'user_login',
			header: () => <span>로그인 방법</span>,
			cell: ({ row }) => <span>{row.original.user_login}</span>,
		},
		{
			accessorKey: 'user_registered_at',
			header: () => <span>등록 날짜</span>,
			cell: ({ row }) => <span>{convertSupabaseDateToShortHumanReadable(row.original.user_registered_at)}</span>,
		},
	];

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting,
			columnVisibility,
			rowSelection,
			columnFilters,
			pagination,
		},
		getRowId: row => row.id.toString(),
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
			<Table>
				<TableHeader className="bg-muted sticky top-0 z-10">
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<TableHead key={header.id}>
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
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
