'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/data-table-column-header';
import { ActionUser } from '@/components/user/action-user';
import { StudentRegisterType } from '@/types/StudentType';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columnUserregister: ColumnDef<StudentRegisterType>[] = [
    {
        accessorKey: 'slug',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[170px]" column={column} title="SLUG" />,
        cell: ({ row }) => <div>{row.original.slug}</div>,
    },
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
        accessorKey: 'phone_number',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="PHONE" />,
        cell: ({ row }) => <div>{row.original.phone_number}</div>,
    },
    {
        accessorKey: 'date_of_birth',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="DATE OF BIRTH" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'place_of_birth',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="PLACE OF BIRTH" />,
        cell: ({ row }) => <div>{row.original.place_of_birth}</div>,
    },
    {
        accessorKey: 'mother_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="MOTHER'S NAME" />,
        cell: ({ row }) => <div>{row.original.mother_name}</div>,
    },
    {
        accessorKey: 'father_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FATHER'S NAME" />,
        cell: ({ row }) => <div>{row.original.father_name}</div>,
    },
    {
        accessorKey: 'date_of_birth_mother',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="MOTHER'S DATE OF BIRTH" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth_mother), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'date_of_birth_father',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FATHER'S DATE OF BIRTH" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth_father), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'family_phone_number',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="FAMILY PHONE" />,
        cell: ({ row }) => <div>{row.original.family_phone_number}</div>,
    },
    {
        accessorKey: 'profile_image',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="PROFILE IMAGE" />,
        cell: ({ row }) => <div>{row.original.profile_image ? 'Uploaded' : 'Not Uploaded'}</div>,
    },
    {
        accessorKey: 'nationality',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="NATIONALITY" />,
        cell: ({ row }) => <div>{row.original.nationality}</div>,
    },
    {
        accessorKey: 'start_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="START DATE" />,
        cell: ({ row }) => <div>{format(new Date(row.original.date_of_birth), 'dd-MMM-yyyy')}</div>,
    },
    {
        accessorKey: 'end_date',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[120px]" column={column} title="END DATE" />,
        cell: ({ row }) => (
            <div>{row.original.date_of_birth_father ? format(new Date(row.original.date_of_birth_father), 'dd-MMM-yyyy') : 'N/A'}</div>
        ),
    },
    {
        accessorKey: 'department_name',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[150px]" column={column} title="DEPARTMENT NAME" />,
        cell: ({ row }) => <div>{row.original.department_name}</div>,
    },
    // {
    //     accessorKey: 'address',
    //     header: ({ column }) => <DataTableColumnHeader className="min-w-[200px]" column={column} title="ADDRESS" />,
    //     cell: ({ row }) => <div>{row.original.address || 'N/A'}</div>,
    // },
    {
        accessorKey: 'verified',
        header: ({ column }) => <DataTableColumnHeader className="min-w-[100px]" column={column} title="STATUS" />,
        cell: ({ row }) => (
            <Badge className={`rounded-[6px] ${row.original.verified ? 'bg-blue-500 text-white' : 'bg-red-400 text-white'}`}>
                {row.original.verified ? 'Allowed' : 'Not Allowed'}
            </Badge>
        ),
    },

    {
        accessorKey: ' ',
        header: ({ column }) => <DataTableColumnHeader column={column} title="" />,
        cell: ({ row }) => (
            <div>
                {row.original.verified ? (
                    <Badge className="bg-background hover:bg-background rounded-[6px] text-red-500">User Ready Verified </Badge>
                ) : (
                    <ActionUser className={`text-[12px]  bg-amber-500 h-auto py-1`} studentId={row.original.id} verified={row.original.verified} />
                )}
            </div>
        ),
    },
];
