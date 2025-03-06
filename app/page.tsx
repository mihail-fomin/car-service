import { getServerSession } from "next-auth";
import Link from "next/link";
import authOptions from "./auth/authOptions";

export default async function Home() {
    const session = await getServerSession(authOptions)

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-4xl font-bold">Планируй обслуживание своего автомобиля</h1>
            <p className="text-center mt-4 text-gray-500">
                Начни сейчас и получи доступ к лучшим инструментам для обслуживания автомобиля.
            </p>
            <div className="flex gap-4 mt-4">
                {!session ? (
                    <Link
                        className="text-white px-4 py-2 rounded-md border-[1px] border-gray-200"
                        href="/api/auth/signin"
                >
                    Войти через Google
                </Link>
                ) : (
                    <Link
                        className="text-white px-4 py-2 rounded-md border-[1px] border-gray-200"
                        href="/api/auth/signout"
                    >
                        Выйти
                    </Link>
                )}
            </div>
        </div>
    )
}
