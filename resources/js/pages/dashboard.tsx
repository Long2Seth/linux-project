import { ChartStudent } from '@/components/chart-board-student';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { FaRegUser } from 'react-icons/fa';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <section className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <section className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className={`flex flex-col gap-3 rounded-[6px] border border-gray-300 px-10 py-7 shadow-sm`}>
                        <h1
                            className={`bg-gradient-to-r from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88] bg-clip-text text-lg font-medium text-transparent uppercase`}
                        >
                            Total Student
                        </h1>
                        <div className={`flex items-center gap-5`}>
                            <FaRegUser className="h-7 w-7" />
                            <p
                                className={`bg-gradient-to-r from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88] bg-clip-text text-4xl font-bold text-transparent`}
                            >
                                1000
                            </p>
                        </div>
                        <h1
                            className={`bg-gradient-to-r from-[#FA8BFF] via-[#2BD2FF] to-[#2BFF88] bg-clip-text text-lg font-medium text-transparent uppercase`}
                        >
                            USERS
                        </h1>
                    </div>
                    <div className={`flex flex-col gap-3 rounded-[6px] border border-gray-300 px-10 py-7 shadow-sm`}>
                        <h1 className={`bg-gradient-to-r from-[#4158D0] to-[#FFCC70] bg-clip-text text-lg font-medium text-transparent uppercase`}>
                            Male Student
                        </h1>
                        <div className={`flex items-center gap-5`}>
                            <FaRegUser className="h-7 w-7" />
                            <p className={`bg-gradient-to-r from-[#4158D0] to-[#FFCC70] bg-clip-text text-4xl font-bold text-transparent`}> 1000</p>
                        </div>
                        <h1 className={`bg-gradient-to-r from-[#4158D0] to-[#FFCC70] bg-clip-text text-lg font-medium text-transparent uppercase`}>
                            USERS
                        </h1>
                    </div>
                    <div className={`flex flex-col gap-3 rounded-[6px] border border-gray-300 px-10 py-7 shadow-sm`}>
                        <h1
                            className={`bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] bg-clip-text text-lg font-medium text-transparent uppercase`}
                        >
                            Female Student
                        </h1>
                        <div className={`flex items-center gap-5`}>
                            <FaRegUser className="h-7 w-7" />
                            <p
                                className={`bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] bg-clip-text text-4xl font-bold text-transparent`}
                            >
                                1000
                            </p>
                        </div>
                        <h1
                            className={`bg-gradient-to-r from-[#FF3CAC] via-[#784BA0] to-[#2B86C5] bg-clip-text text-lg font-medium text-transparent uppercase`}
                        >
                            USERS
                        </h1>
                    </div>
                </section>
                <section>
                    <ChartStudent />
                </section>
            </section>
        </AppLayout>
    );
}
