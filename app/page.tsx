import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./auth/authOptions";
import BaseButton from "./components/ui/BaseButton";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] items-center justify-center">
            <section className="max-w-3xl px-4 text-center">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Планируй обслуживание своего автомобиля</h1>
                <p className="mt-4 text-center text-gray-500 dark:text-gray-400">
                    Начни сейчас и получи доступ к лучшим инструментам для обслуживания автомобиля.
                </p>

                {session && (
                    <div className="flex justify-center gap-4 mt-8">
                        <BaseButton>
                            <Link href='/maintenance'>
                                История обслуживания
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
