import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import UserRegisterComponent from "@/components/user/StudentRegisterComponent";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Users',
        href: '/user',
    },
];

export default function User() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-hidden">
                <UserRegisterComponent />
            </section>
        </AppLayout>
    );
}


