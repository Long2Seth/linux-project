import { StudentComponent } from '@/components/student/data-table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'All Students',
        href: '/students',
    },
];

export default function Students() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/*<StudentComponent />*/}
            </section>
        </AppLayout>
    );
}


