// resources/js/components/Layout.tsx
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Layout({ children, title }: { children: React.ReactNode; title: string }) {
    const { auth, url } = usePage<SharedData>().props;
    const [isScrollingUp, setIsScrollingUp] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY && currentScrollY > 10) {
                setIsScrollingUp(true);
            } else {
                setIsScrollingUp(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <Head title={title} />
            <div className="flex w-full flex-col bg-[#f9f9f9] dark:bg-[#1a1a1a]">
                <nav
                    className={`fixed top-0 z-40 w-full border-b bg-white py-3 transition-transform ease-in-out ${
                        isScrollingUp ? '-translate-y-full duration-300' : 'translate-y-0 duration-300'
                    }`}
                >
                    <section className="container mx-auto flex items-center justify-between px-4">
                        <div className="flex items-center gap-3">
                            <img src="/images/logo.png" className="h-[70px] w-[70px] object-cover" alt="RUPP Logo" />
                            <div className="flex flex-col items-start gap-1">
                                <h1 className="text-xl font-bold">សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ</h1>
                                <h4 className="text-sm">ROYAL UNIVERSITY OF PHNOM PENH</h4>
                            </div>
                        </div>

                        <ul className="hidden gap-10 text-lg font-medium md:flex">
                            <li>
                                <a
                                    href="/"
                                    className={`relative transition-colors duration-300 hover:text-blue-600 ${
                                        url === '/' ? 'text-blue-600' : 'text-black'
                                    } animated-underline`}
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/about"
                                    className={`relative transition-colors duration-300 hover:text-blue-600 ${
                                        url === '/about' ? 'text-blue-600' : 'text-black'
                                    } animated-underline`}
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="/contact"
                                    className={`relative transition-colors duration-300 hover:text-blue-600 ${
                                        url === '/contact' ? 'text-blue-600' : 'text-black'
                                    } animated-underline`}
                                >
                                    Contact
                                </a>
                            </li>

                            <li>
                                <a
                                    href="/register-student"
                                    className={`relative transition-colors duration-300 hover:text-blue-600 ${
                                        url === '/register-student' ? 'text-blue-600' : 'text-black'
                                    } animated-underline`}
                                >
                                    Register
                                </a>
                            </li>
                        </ul>

                        <div>
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm bg-[#afc94b] px-5 py-1.5 text-lg font-medium text-white hover:bg-[#afc94b]/90"
                                >
                                    Log in
                                </Link>
                            )}
                        </div>
                    </section>
                </nav>

                <main className="container mx-auto mt-1 h-[1600px] px-4 pt-24">{children}</main>
            </div>

            {/* Inline CSS for the animation */}
            <style>
                {`
                .animated-underline {
                    position: relative;
                }

                .animated-underline::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -4px;
                    left: 0;
                    margin-bottom: -5px;
                    background-color: #3b82f6;
                    transition: width 0.3s ease-in-out;
                }

                .animated-underline:hover::after {

                    width: 100%;
                }
            `}
            </style>
        </>
    );
}
