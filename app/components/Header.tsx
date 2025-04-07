import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "../auth/authOptions";
import { Avatar } from "antd";
import Image from "next/image";
import BaseButton from "./ui/BaseButton";
import MobileMenu from "./MobileMenu";

export default async function Header() {
    const session = await getServerSession(authOptions);

    return (
        <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                            CarService
                        </Link>
                        {session && (
                            <nav className="hidden md:flex ml-10 space-x-4">
                                <Link href="/cars" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Автомобили
                                </Link>
                                <Link href="/maintenance" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Обслуживание
                                </Link>
                                <Link href="/reports" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Отчеты
                                </Link>
                                <Link href="/settings" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    Настройки
                                </Link>
                            </nav>
                        )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {session ? (
                            <>
                                <div className="hidden md:flex items-center gap-2">
                                    <Avatar size={40}>
                                        <Image
                                            src={session.user?.image || ""}
                                            alt="avatar"
                                            width={40}
                                            height={40}
                                        />
                                    </Avatar>
                                    <BaseButton>
                                        <Link href="/api/auth/signout">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                            </svg>
                                        </Link>
                                    </BaseButton>
                                </div>
                                <MobileMenu session={session} />
                            </>
                        ) : (
                            <>
                                <div className="hidden md:block">
                                    <Link
                                        className="text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md border-[1px] border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        href="/api/auth/signin"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                        </svg>
                                    </Link>
                                </div>
                                <MobileMenu session={session} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
} 