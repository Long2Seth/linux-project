import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoIosPower, IoMdMore } from 'react-icons/io';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { EditFormStudent } from '@/components/edit-form-student';
import { LiaEdit } from 'react-icons/lia';

type ActionStudentProps = {
    id: string;
    isStatus: boolean;
    onStatusChange?: (id: string, newStatus: boolean) => void;
    onDelete?: (id: string) => void;
};

export function ActionStudent({ id, isStatus, onStatusChange, onDelete }: ActionStudentProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(isStatus);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false); // State to control EditFormStudent visibility

    const handlePublishToggle = () => {
        setIsLoading(true);

        router.patch(
            `/students/${id}/toggle-status`,
            {},
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const response = page.props as { status?: boolean };
                    const newStatus = response.status ?? !currentStatus;
                    setCurrentStatus(newStatus);
                    if (onStatusChange) {
                        onStatusChange(id, newStatus);
                    }
                },
                onError: (errors) => {
                    console.error('Failed to toggle student status:', errors);
                    alert('Failed to update student status. Please try again.');
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    const handleDelete = () => {
        if (!confirm('Are you sure you want to mark this student as deleted?')) {
            return;
        }

        setIsLoading(true);
        router.delete(
            `/students/${id}`,
            {
                preserveState: true,
                preserveScroll: true,
                onSuccess: (page) => {
                    const response = page.props as { is_deleted?: boolean };
                    if (response.is_deleted && onDelete) {
                        onDelete(id);
                    }
                },
                onError: (errors) => {
                    console.error('Failed to delete student:', errors);
                    alert('Failed to mark student as deleted. Please try again.');
                },
                onFinish: () => {
                    setIsLoading(false);
                },
            }
        );
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <IoMdMore className="h-5 w-5 cursor-pointer hover:bg-background text-black" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dark:bg-khotixs-background-dark rounded-[6px] bg-white shadow-lg dark:border-none">
                    <DropdownMenuItem
                        onClick={handlePublishToggle}
                        disabled={isLoading}
                        className="dark:hover:bg-opacity-10 cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-white dark:hover:backdrop-blur"
                    >
                        <IoIosPower className="h-5 w-5" />
                        <span className="ml-2 text-sm md:text-base">
                            {isLoading ? 'Updating...' : (currentStatus ? 'Disable' : 'Enable')}
                        </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setIsEditFormOpen(true)}
                        className="cursor-pointer space-x-2 text-sm md:text-base"
                    >
                        <LiaEdit className="h-5 w-5" />
                        <span className=" text-sm md:text-base">Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="text-red-500 hover:text-red-600 cursor-pointer space-x-2 text-sm md:text-base"
                    >
                        <AiOutlineDelete className="h-5 w-5" />
                        <span>Delete Student</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <EditFormStudent id={id} isOpen={isEditFormOpen} onClose={() => setIsEditFormOpen(false)} />
        </>
    );
}
