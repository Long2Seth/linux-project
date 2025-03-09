'use client';

import { ActionStudent } from '@/components/student/action-student';
import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { StudentType } from '@/types/StudentType';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columnStudent: ColumnDef<StudentType>[] = [
    {
        accessorKey: 'slug',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[170px]" column={column} title="SLUG" />,
        cell: ({ row }) => <div>{`${row.original.slug}`}</div>,
    },
    {
        accessorKey: 'first_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FIRST NAME" />,
        cell: ({ row }) => <div>{`${row.original.first_name}`}</div>,
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="LAST NAME" />,
        cell: ({ row }) => <div>{`${row.original.last_name}`}</div>,
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="GENDER" />,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[200px]" column={column} title="EMAIL" />,
    },
    {
        accessorKey: 'phone_number',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="PHONE" />,
    },
    {
        accessorKey: 'date_of_birth',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="DATE OF BIRTH" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth), 'dd-MMM-yyyy')}</div>,
    },

    {
        accessorKey: 'start_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="START DATE" />,
        cell: ({ row }) => <div>{format(new Date(row.original.start_date), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="END DATE" />,
        cell: ({ row }) => <div>{format(new Date(row.original.end_date), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'department_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="DEPARTMENT NAME" />,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[200px]" column={column} title="ADDRESS" />,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="STATUS" />,
        cell: ({ row }) => (
            <Badge
                className={`rounded-[6px] ${
                    row.original.status ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'
                }`}
            >
                {row.original.status ? "Enable" : 'Disable'}
            </Badge>
        ),
    },
    {
        accessorKey: 'is_graduate',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="GRATUATED" />,
        cell: ({ row }) => (
            <Badge
                className={`rounded-[6px] ${
                    row.original.is_graduate ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'
                }`}
            >
                {row.original.is_graduate ? "Graduated" : 'Undergraduate'}
            </Badge>
        ),
    },
    {
        id: 'action', // Changed from accessorKey to id since it's not mapping to a specific data field
        header: () => <div className="text-start">ACTIONS</div>,
        cell: ({ row }) => (
            <ActionStudent
                id={row.original.id}
                isStatus={row.original.status}
            />
        ),
    },
];
