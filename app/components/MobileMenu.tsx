'use client'

import { useState, useEffect } from "react";
import Link from "next/link";
import { Avatar } from "antd";
import Image from "next/image";
import BaseButton from "./ui/BaseButton";

interface MobileMenuProps {
    session: any;
}

export default function MobileMenu({ session }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (isOpen && !target.closest('.mobile-menu-content')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 dark:text-gray-300"
                aria-label="Открыть меню"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-50" />
                    <div className="absolute left-0 right-0 z-50 bg-white shadow-lg top-16 dark:bg-gray-800 mobile-menu-content">
                        <div className="px-4 py-2 space-y-2">
                            {session ? (
                                <>
                                    <div className="flex items-center gap-2 py-2 border-b border-gray-200 dark:border-gray-700">
                                        <Avatar size={40}>
                                            <Image
                                                src={session.user?.image || ""}
                                                alt="avatar"
                                                width={40}
                                                height={40}
                                            />
                                        </Avatar>
                                        <span className="font-medium text-gray-900 dark:text-white">
                                            {session.user?.name || "Пользователь"}
                                        </span>
                                    </div>
                                    
                                    <Link 
                                        href="/cars" 
                                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Автомобили
                                    </Link>
                                    <Link 
                                        href="/maintenance" 
                                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Обслуживание
                                    </Link>
                                    <Link 
                                        href="/reports" 
                                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Отчеты
                                    </Link>
                                    <Link 
                                        href="/settings" 
                                        className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Настройки
                                    </Link>
                                    
                                    <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                                        <BaseButton>
                                            <Link href="/api/auth/signout" onClick={() => setIsOpen(false)}>
                                                <div className="flex items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                                    </svg>
                                                    <span>Выйти</span>
                                                </div>
                                            </Link>
                                        </BaseButton>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                    href="/api/auth/signin"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>
                                        <span>Войти</span>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 