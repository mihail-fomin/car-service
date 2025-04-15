import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import '@ant-design/v5-patch-for-react-19';

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
            <body className={`${roboto.variable} antialiased min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900`}>
                <Header />
                <main className="flex-1">
                    {children}
                </main>
            </body>
        </html>
    );
}
