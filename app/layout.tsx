import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-roboto",
});

export const metadata: Metadata = {
    title: "CarService - Управление автомобилем",
    description: "Приложение для управления обслуживанием автомобиля",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className="dark">
            <body className={`${roboto.variable} antialiased min-h-screen bg-gray-50 dark:bg-gray-900`}>
                <Header />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
                </main>
            </body>
        </html>
    );
}
