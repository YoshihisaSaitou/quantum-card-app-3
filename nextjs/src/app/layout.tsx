import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "クアンタムタロットカード",
    description: "タロットカードのアプリケーション",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja" className="h-screen overscroll-none">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-hidden`}
            >
                {children}
            </body>
        </html>
    );
}
