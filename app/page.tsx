import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./auth/authOptions";
import BaseButton from "./components/ui/BaseButton";
import { Avatar } from "antd";
import Image from "next/image";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center">
            <section className="max-w-3xl text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Планируй обслуживание своего автомобиля</h1>
                <p className="text-center mt-4 text-gray-500 dark:text-gray-400">
                    Начни сейчас и получи доступ к лучшим инструментам для обслуживания автомобиля.
                </p>

                {session && (
                    <div className="flex gap-4 mt-8 justify-center">
                        <BaseButton>
                            <Link href='/maintenance'>
                                Перейти к планированию
                            </Link>
                        </BaseButton>

                        <BaseButton>
                            <Link href='/maintenance/new'>
                                Добавить запись
                            </Link>
                        </BaseButton>
                    </div>
                )}
            </section>
        </div>
    )
}
