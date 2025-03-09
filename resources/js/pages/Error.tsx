// resources/js/Pages/Error.tsx
import { PageProps } from '@inertiajs/core';
import AppLayout from '@/layouts/app-layout'; // Adjust path as needed

interface ErrorProps extends PageProps {
    message: string;
}

export default function Error({ message }: ErrorProps) {
    return (
        <AppLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p>{message}</p>
            </div>
        </AppLayout>
    );
}
