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
        header: ({ column }) => <DataTableColumnHeader className="min-w-[270px]" column={column} title="SLUG" />,
        cell: ({ row }) => <div>{row.original.slug}</div>,
    },
    // {
    //     accessorKey: 'profile_image',
    //     header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="PROFILE IMAGE" />,
    //     cell: ({ row }) => <div>{row.original.profile_image || 'N/A'}</div>,
    // },
    {
        accessorKey: 'first_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FIRST NAME" />,
        cell: ({ row }) => <div>{row.original.first_name}</div>,
    },
    {
        accessorKey: 'last_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="LAST NAME" />,
        cell: ({ row }) => <div>{row.original.last_name}</div>,
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="GENDER" />,
        cell: ({ row }) => <div>{row.original.gender}</div>,
    },
    {
        accessorKey: 'date_of_birth',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="DATE OF BIRTH" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'nationality',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="NATIONALITY" />,
        cell: ({ row }) => <div>{row.original.nationality}</div>,
    },
    {
        accessorKey: 'place_of_birth',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="PLACE OF BIRTH" />,
        cell: ({ row }) => <div>{row.original.place_of_birth}</div>,
    },
    {
        accessorKey: 'address',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[200px]" column={column} title="ADDRESS" />,
        cell: ({ row }) => <div>{row.original.address || 'N/A'}</div>,
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="START DATE" />,
        cell: ({ row }) => <div>{format(new Date(row.original.start_date), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="END DATE" />,
        cell: ({ row }) => <div>{row.original.end_date ? format(new Date(row.original.end_date), 'dd-MMM-yyyy') : 'N/A'}</div>,
    },
    {
        accessorKey: 'department_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="DEPARTMENT NAME" />,
        cell: ({ row }) => <div>{row.original.department_name}</div>,
    },
    {
        accessorKey: 'phone_number',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="PHONE" />,
        cell: ({ row }) => <div>{row.original.phone_number || 'N/A'}</div>,
    },
    {
        accessorKey: 'email',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[200px]" column={column} title="EMAIL" />,
        cell: ({ row }) => <div> {row.original.email}</div>,
    },
    {
        accessorKey: 'mother_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="MOTHER NAME" />,
        cell: ({ row }) => <div>{row.original.mother_name}</div>,
    },
    {
        accessorKey: 'father_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FATHER NAME" />,
        cell: ({ row }) => <div>{row.original.father_name}</div>,
    },
    {
        accessorKey: 'date_of_birth_mother',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="MOTHER DOB" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth_mother), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'date_of_birth_father',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="FATHER DOB" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth_father), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'family_phone_number',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="FAMILY PHONE" />,
        cell: ({ row }) => <div>{row.original.family_phone_number}</div>,
    },
    {
        accessorKey: 'is_status',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="STATUS" />,
        cell: ({ row }) => (
            <Badge className={`rounded-[6px] ${row.original.is_status ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'}`}>
                {row.original.is_status ? 'Enable' : 'Disable'}
            </Badge>
        ),
    },
    {
        accessorKey: 'is_graduate',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="GRADUATED" />,
        cell: ({ row }) => (
            <Badge className={`rounded-[6px] ${row.original.is_graduate ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'}`}>
                {row.original.is_graduate ? 'Graduated' : 'Undergraduate'}
            </Badge>
        ),
    },
    // {
    //     accessorKey: 'is_deleted',
    //     header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="DELETED" />,
    //     cell: ({ row }) => (
    //         <Badge className={`rounded-[6px] ${row.original.is_deleted ? 'bg-red-400 text-white' : 'bg-green-500 text-white'}`}>
    //             {row.original.is_deleted ? 'Deleted' : 'Active'}
    //         </Badge>
    //     ),
    // },
    {
        accessorKey: 'created_at',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="CREATED AT" />,
        cell: ({ row }) => <div>{format(new Date(row.original.created_at), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'updated_at',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="UPDATED AT" />,
        cell: ({ row }) => <div>{format(new Date(row.original.updated_at), 'dd-MMM-yyyy')}</div>,
    },
    {
        id: 'action',
        header: () => <div className="text-start">ACTIONS</div>,
        cell: ({ row }) => (
            <ActionStudent
                id={row.original.id.toString()}
                isStatus={row.original.is_status} // Updated from 'status' to 'is_status'
            />
        ),
    },
];
