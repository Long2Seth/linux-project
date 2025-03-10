import { useEffect, useState } from 'react';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > 10) {
                setIsScrollingDown(currentScrollY > lastScrollY);
            } else {
                setIsScrollingDown(false);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <Head title="សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ">
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
            <div className="flex w-full flex-col bg-[#f9f9f9] dark:bg-[#1a1a1a]">
                <nav
                    className={`z-40 w-full border-b bg-white py-3 fixed top-0 transition-transform ease-in-out ${
                        isScrollingDown ? 'translate-y-0 duration-200' : '-translate-y-[90px] duration-1200'
                    }`}
                >
                    <section className="container mx-auto flex items-center justify-between">
                        <section className="h-full flex gap-3 justify-center items-center">
                            <img src="/images/logo.png" className="h-[70px] w-[70px] bg-cover" />
                            <div className="flex flex-col items-start gap-1">
                                <h1 className="font-bold text-xl">សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</h1>
                                <h4 className="text-sm">ROYAL UNIVERSITY OF PHNOM PENH</h4>
                            </div>
                        </section>

                        <section className="flex">
                            <ul className="flex gap-10 text-lg font-medium">
                                <li><a>Home</a></li>
                                <li><a>About</a></li>
                                <li><a>Contact</a></li>
                                <li><a>Home</a></li>
                                <li><a>Home</a></li>
                            </ul>
                        </section>
                        <section>
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
                                        className="inline-block rounded-sm bg-[#afc94b]  hover:bg-[#afc94b]/90 text-white px-5 py-1.5 text-lg font-medium "
                                    >
                                        Log in
                                    </Link>
                                </>
                            )}
                        </section>
                    </section>
                </nav>
                <main className="container mx-auto flex w-full h-[2000px] items-center justify-center text-center">
                    <div className="flex flex-col space-y-3">
                        <h1 className="animate-color1 text-3xl font-bold text-transparent">WELCOME</h1>
                        <h1 className="animate-color2 text-center text-3xl font-bold text-transparent">
                            RUPP IT Department - Student Management System
                        </h1>
                        <p className="max-w-[1200px] text-center text-lg text-[#1b1b18] dark:text-[#EDEDEC]">
                            A comprehensive platform designed to streamline student enrollment, manage user accounts, and automatically track
                            graduation dates. This system ensures that student access remains active throughout their studies and expires one day
                            after graduation.
                        </p>
                    </div>
                </main>
                <div className="hidden h-14.5 lg:block"></div>
            </div>
        </>
    );
}
