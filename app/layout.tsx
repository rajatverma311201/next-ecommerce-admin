import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/components/providers/modal-provider";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard for ecommerce store",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    // enableSystem
                >
                    <Toaster
                        position="top-center"
                        richColors={true}
                        theme="dark"
                    />
                    <ModalProvider />
                    <ClerkProvider>{children}</ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
