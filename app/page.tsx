import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./auth/authOptions";
import BaseButton from "./components/ui/BaseButton";
import { Avatar } from "antd";
import Image from "next/image";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col h-screen p-4">
            <header className="w-full">
                <div className="flex items-center justify-end gap-2">
                    {session ? (
                        <>
                            <Avatar size={64}>
                                <Image
                                    src={session.user?.image || ""}
                                    alt="avatar"
                                    width={64}
                                    height={64}
                                />
                            </Avatar>
                
                            <BaseButton>
                                <Link
                                    href="/api/auth/signout"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                    </svg>
                                </Link>
                            </BaseButton>
                        </>

                    ) : (
                        <div className="flex gap-4 mt-4">
                            <Link
                                className="text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md border-[1px] border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                                href="/api/auth/signin"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            <section className="flex flex-col items-center justify-center flex-grow text-center mx-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Планируй обслуживание своего автомобиля</h1>
                <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                    Начни сейчас и получи доступ к лучшим инструментам для обслуживания автомобиля.
                </p>

                {session && (
                    <div className="flex gap-4 mt-4">
                        <BaseButton>
                            <Link
                                href='/maintenance'
                            >
                                Перейти к планированию
                            </Link>
                        </BaseButton>

                        <BaseButton>
                            <Link
                                href='/maintenance/new'
                            >
                                Добавить запись
                            </Link>
                        </BaseButton>
                        
                    </div>
                )}
            </section>
        </div>
    )
}
