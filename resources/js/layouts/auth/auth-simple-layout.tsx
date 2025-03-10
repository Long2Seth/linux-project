import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-background flex flex-col items-center justify-center gap-6 p-6 md:p-10 w-full h-screen">
            <div className="w-full max-w-xl border rounded-[6px] p-20 backdrop-blur-2xl bg-gray-100">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex items-center justify-center rounded-md">
                                <img src={`/images/logo.png`} className={` w-20 h-20`}/>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center">
                            <h1 className="text-3xl font-medium">{title}</h1>
                            <p className="text-muted-foreground text-center text-lg">{description}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
