// StudentRegisterComponent.tsx
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Pagination } from '@/components/pagination';
import { columnUserregister} from "@/components/user/StudentRegisterColunm";
import { Input } from '@/components/ui/input';
import { StudentRegisterType } from '@/types/StudentType';
import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface FilterParams {
    page?: number;
    per_page?: number;
    search?: string;
    department?: string;
    status?: string;
}

export function StudentRegisterComponent() {
    const { props } = usePage<{
        students: StudentRegisterType[];
        meta: PaginationMeta;
        filters?: {
            search?: string;
            department?: string;
            status?: string;
        };
        errors?: { message: string };
    }>();

    const students = props.students ?? [];
    const meta = props.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: 10, // Match backend default
        total: 0,
    };
    const filters = props.filters ?? {};

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [currentPage, setCurrentPage] = useState<number>(meta.current_page);
    const [itemsPerPage, setItemsPerPage] = useState<number>(meta.per_page);
    const [studentName, setStudentName] = useState<string>(filters.search || '');

    const updateFilters = useCallback(
        (params: FilterParams = {}) => {
            router.visit('/user', {
                method: 'get', // This is correct
                data: {
                    page: currentPage,
                    per_page: itemsPerPage,
                    search: studentName.trim() || undefined,
                    department: filters.department || undefined,
                    status: filters.status || undefined,
                    ...params,
                },
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    console.log('Filter update successful');
                },
                onError: (errors) => {
                    console.error('Filter update failed:', errors);
                },
            });
        },
        [currentPage, itemsPerPage, studentName, filters.department, filters.status],
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateFilters({ page });
    };

    const handleItemsPerPageChange = (perPage: number) => {
        setItemsPerPage(perPage);
        setCurrentPage(1);
        updateFilters({ per_page: perPage, page: 1 });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1);
            updateFilters({ page: 1 });
        }, 300);

        return () => clearTimeout(timer);
    }, [studentName, updateFilters]);

    const table = useReactTable({
        data: students,
        columns: columnUserregister, // Use the correct columns
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <section className="flex w-full flex-col">
            <section>
                <div className="my-5">
                    <div className="flex flex-row items-start justify-between gap-4 px-10 sm:items-center">
                        <div>
                            <h1 className="text-title-color bg-gradient-to-r from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88] bg-clip-text text-lg font-bold text-transparent uppercase md:text-2xl xl:text-4xl">
                                STUDENT INFORMATION
                            </h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="dark:bg-opacity-5 w-full space-y-4 rounded-[6px] bg-white px-10 dark:backdrop-blur">
                <section className="flex w-full flex-col items-center gap-2 lg:flex-row">
                    <Input
                        placeholder="Search by student name"
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                        className="text-md border-light-border-color text-primary-color-text dark:bg-opacity-0 dark:text-secondary-color-text h-[50px] w-full rounded-[6px] border-[1px] bg-white placeholder:text-gray-400 md:text-lg dark:backdrop-blur"
                    />
                </section>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        className="dark:hover:bg-khotixs-background-dark hover:bg-gray-100"
                                        key={row.id}
                                        data-state={row.getIsSelected() && 'selected'}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="py-2" key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columnUserregister.length} className="h-20 text-center text-lg">
                                        <div className="flex w-full items-center justify-center gap-2">
                                            <span className="text-4xl font-semibold text-red-500">No results found.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Pagination
                    totalItems={meta.total}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                />
            </section>
        </section>
    );
}

export default StudentRegisterComponent;
