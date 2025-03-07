'use client';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiDetail } from 'react-icons/bi';
import { IoIosPower, IoMdMore } from 'react-icons/io';
import { LiaEdit } from 'react-icons/lia';

export function ActionStudent() {
    const handlePublishToggle = async () => {
        try {
            // if (isPublish) {
            //     await unpublishEvent(id).unwrap();
            // } else {
            //     await publishEvent(id).unwrap();
            // }
        } catch (error) {
            console.error('Failed to toggle publish state:', error);
        }
    };

    const handleDelete = async () => {
        // try {
        //     const response = await fetch(endpoint, {
        //         method: 'DELETE',
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }
        //
        //     // Optionally, you can handle the response or update the state here
        // } catch (error) {
        //     console.error('Failed to delete event:', error);
        // }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IoMdMore className="h-5 w-5 cursor-pointer  hover:bg-background text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-khotixs-background-dark rounded-[6px] bg-white shadow-lg dark:border-none">
                {/*<DropdownMenuItem*/}
                {/*    className={`dark:hover:bg-opacity-10 cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-white dark:hover:backdrop-blur`}*/}
                {/*>*/}
                {/*    <BiDetail className="h-5 w-5" />*/}
                {/*    <span className={`ml-2 text-sm md:text-base`}>Event Detail</span>*/}
                {/*</DropdownMenuItem>*/}
                <DropdownMenuItem
                    onClick={handlePublishToggle}
                    className={`dark:hover:bg-opacity-10 cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-white dark:hover:backdrop-blur`}
                >
                    <IoIosPower className="h-5 w-5" />
                    {/*<span className={`ml-2 text-sm md:text-base`}>*/}
                    {/*    {isPublish ? 'Unpublished Event' : 'Published Event'}*/}
                    {/*</span>*/}
                </DropdownMenuItem>
                <DropdownMenuItem
                    className={`dark:hover:bg-opacity-10 cursor-pointer rounded-[6px] hover:bg-gray-100 dark:hover:bg-white dark:hover:backdrop-blur`}
                >
                    <LiaEdit className="h-5 w-5" />
                    <span className={`ml-2 text-sm md:text-base`}>Edit Event</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={handleDelete}
                    className={`dark:hover:bg-opacity-10 cursor-pointer rounded-[6px] text-red-600 hover:bg-gray-100 dark:hover:bg-white dark:hover:backdrop-blur`}
                >
                    <AiOutlineDelete className="h-5 w-5" />
                    <span className={`ml-2 text-sm md:text-base`}>Delete Event</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
