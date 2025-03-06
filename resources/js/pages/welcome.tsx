import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">


                {/* Inject custom CSS for animations and font family */}
                <style>
                    {`
                        @keyframes colorChange1 {
                            0% { color: #4158D0; }
                            33% { color: #C850C0; }
                            66% { color: #FFCC70; }
                            100% { color: #4158D0; }
                        }
                        @keyframes colorChange2 {
                            0% { color: #FF9A8B; }
                            33% { color: #FF6A88; }
                            66% { color: #FF99AC; }
                            100% { color: #FF9A8B; }
                        }
                        .animate-color1 {
                            animation: colorChange1 5s infinite;
                            font-family: 'KoHo', sans-serif;
                        }
                        .animate-color2 {
                            animation: colorChange2 5s infinite;
                            font-family: 'KoHo', sans-serif;
                        }
                        body {
                            font-family: 'KoHo', sans-serif;
                        }
                    `}
                </style>
            </Head>
            <div className="flex min-h-screen w-full bg-[#f9f9f9] dark:bg-[#1a1a1a]">
                <main className="container mx-auto flex w-full items-center justify-center text-center">
                    <div className="flex flex-col space-y-3">
                        <h1 className="animate-color1 text-3xl font-bold text-transparent">WELCOME</h1>
                        <h1 className="animate-color2 text-center text-3xl font-bold text-transparent">
                            RUPP IT Department - Student Management System
                        </h1>
                        <p className="max-w-[1200px] text-center text-lg text-[#1b1b18] dark:text-[#EDEDEC]">
                            A comprehensive platform designed to streamline student enrollment, manage user accounts, and automatically track
                            graduation dates. This system ensures that student access remains active throughout their studies and expires one day
                            after graduation
                        </p>
                        <nav className="flex w-full justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </main>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
