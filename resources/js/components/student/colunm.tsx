"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ActionStudent } from '@/components/student/action-student';
import { format } from "date-fns";
import { StudentType } from '@/types/StudentType';

export const columnStudent: ColumnDef<StudentType>[] = [
    {
        accessorKey: "no",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[70px]" column={column} title="NO" />
        ),
        cell: ({ row, table }) => <div>{table.getSortedRowModel().flatRows.indexOf(row) + 1}</div>,
    },
    {
        accessorKey: "first_name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[150px]" column={column} title="FIRST NAME" />
        ),
        cell: ({ row }) => (
            <div>{`${row.original.first_name}`}</div>
        ),
    },
    {
        accessorKey: "last_name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[150px]" column={column} title="LAST NAME" />
        ),
        cell: ({ row }) => (
            <div>{`${row.original.last_name}`}</div>
        ),
    },
    {
        accessorKey: "gender",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[100px]" column={column} title="GENDER" />
        ),
    },
    {
        accessorKey: "date_of_birth",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[120px]" column={column} title="DATE OF BIRTH" />
        ),
        cell: ({ row }) => (
            <div>{format(new Date(row.original.date_of_birth), "dd MMMM yyyy")}</div>
        ),
    },
    {
        accessorKey: "address",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[200px]" column={column} title="ADDRESS" />
        ),
    },
    {
        accessorKey: "start_date", // Changed from start_learn
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[120px]" column={column} title="START DATE" />
        ),
        cell: ({ row }) => (
            <div>{format(new Date(row.original.start_date), "dd MMMM yyyy")}</div>
        ),
    },
    {
        accessorKey: "department_name",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[150px]" column={column} title="DEPARTMENT NAME" />
        ),
    },
    {
        accessorKey: "phone_number",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[120px]" column={column} title="PHONE" />
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[200px]" column={column} title="EMAIL" />
        ),
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader className="min-w-[100px]" column={column} title="STATUS" />
        ),
        cell: ({ row }) => (
            <Badge
                className={`rounded-[6px] ${
                    row.original.status === 'active'
                        ? 'bg-label-free text-label-text-primary'
                        : 'bg-label-paid text-label-text-primary'
                }`}
            >
                {row.original.status}
            </Badge>
        ),
    },
    {
        accessorKey: "action",
        header: () => <div className="text-start">ACTIONS</div>,
        cell: () => <ActionStudent />,
    },
];
