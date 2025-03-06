"use client";

import * as React from "react";
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
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useMemo, useState, useEffect, useCallback } from "react";
import { Pagination } from '@/components/pagination';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { columnStudent } from '@/components/student/colunm';
import { StudentType } from '@/types/StudentType';
import { usePage, router } from '@inertiajs/react';

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

export function StudentComponent() {
    const { props } = usePage<{
        students: StudentType[];
        meta: PaginationMeta;
    }>();

    const students: StudentType[] = props.students ?? [];
    const meta: PaginationMeta = props.meta ?? {
        current_page: 1,
        last_page: 1,
        per_page: 20,
        total: 0
    };

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [currentPage, setCurrentPage] = useState<number>(meta.current_page);
    const [itemsPerPage, setItemsPerPage] = useState<number>(meta.per_page);
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [studentName, setStudentName] = useState<string>("");

    // Memoized updateFilters function to prevent unnecessary re-renders
    const updateFilters = useCallback((params: FilterParams = {}) => {
        router.get(
            '/students',
            {
                page: currentPage,
                per_page: itemsPerPage,
                search: studentName.trim(), // Trim to avoid empty spaces
                department: selectedDepartment === "all" ? undefined : selectedDepartment,
                status: selectedStatus === "all" ? undefined : selectedStatus,
                ...params,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                onSuccess: () => {
                    console.log('Filter update successful'); // Debug log
                },
                onError: (errors) => {
                    console.error('Filter update failed:', errors); // Debug log
                }
            }
        );
    }, [currentPage, itemsPerPage, studentName, selectedDepartment, selectedStatus]);

    // Handle page changes
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateFilters({ page });
    };

    // Handle items per page changes
    const handleItemsPerPageChange = (perPage: number) => {
        setItemsPerPage(perPage);
        setCurrentPage(1);
        updateFilters({ per_page: perPage, page: 1 });
    };

    // Handle filter changes with debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentPage(1); // Reset to page 1 on filter change
            updateFilters({ page: 1 });
        }, 300);

        return () => clearTimeout(timer);
    }, [studentName, selectedDepartment, selectedStatus, updateFilters]);

    const departments = useMemo(() =>
            Array.from(new Set(students.map(student => student.department_name))),
        [students]
    );

    const table = useReactTable({
        data: students,
        columns: columnStudent,
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
        <section className="w-full flex flex-col">
            <section>
                <div className="my-5">
                    <div className="flex flex-row justify-between items-start sm:items-center gap-4">
                        <div className="w-[80%]">
                            <h1 className="text-title-color text-lg md:text-2xl xl:text-4xl font-bold dark:text-secondary-color-text">
                                STUDENT INFORMATION
                            </h1>
                        </div>
                        <Button
                            className="text-secondary-color-text rounded-[6px] bg-primary-color hover:bg-primary-color/80"
                            onClick={() => router.visit('/students/create')}
                        >
                            Create Student
                        </Button>
                    </div>
                </div>
            </section>
            <section className="w-full bg-white p-10 rounded-[6px] dark:backdrop-blur dark:bg-opacity-5 space-y-4">
                <section className="w-full flex flex-col items-center gap-2 lg:flex-row">
                    <Input
                        placeholder="Search by student name"
                        value={studentName}
                        onChange={(event) => setStudentName(event.target.value)}
                        className="w-full border-[1px] h-[50px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text"
                    />
                    <section className="w-full lg:w-auto flex flex-col sm:flex-row gap-2">
                        <Select
                            onValueChange={(value) => {
                                setSelectedDepartment(value);
                            }}
                            value={selectedDepartment}
                        >
                            <SelectTrigger
                                className={`w-full lg:max-w-[300px] h-[50px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 ${selectedDepartment === "all" ? "text-gray-400" : "text-black"} dark:backdrop-blur dark:bg-opacity-5 dark:text-secondary-color-text`}
                            >
                                <SelectValue placeholder="Department" />
                            </SelectTrigger>
                            <SelectContent className="w-full lg:max-w-[300px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] text-primary-color-text dark:backdrop-blur dark:bg-opacity-5 dark:text-secondary-color-text">
                                <SelectItem value="all">All Departments</SelectItem>
                                {departments.map(department => (
                                    <SelectItem key={department} value={department}>
                                        {department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            onValueChange={(value) => {
                                setSelectedStatus(value);
                            }}
                            value={selectedStatus}
                        >
                            <SelectTrigger
                                className={`w-full lg:max-w-[250px] h-[50px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] placeholder:text-gray-400 ${selectedStatus === "all" ? "text-gray-400" : "text-black"} dark:backdrop-blur dark:bg-opacity-5 dark:text-secondary-color-text`}
                            >
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="w-full lg:max-w-[250px] border-[1px] text-md md:text-lg bg-white border-light-border-color rounded-[6px] text-primary-color-text dark:backdrop-blur dark:bg-opacity-0 dark:text-secondary-color-text">
                                <SelectItem value="all">All Statuses</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                    </section>
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
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        className="hover:bg-gray-100 dark:hover:bg-khotixs-background-dark"
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell className="py-2" key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columnStudent.length}
                                        className="h-20 text-center text-lg"
                                    >
                                        <div className="flex w-full justify-center items-center gap-2">
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

export default StudentComponent;
