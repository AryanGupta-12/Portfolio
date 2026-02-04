import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/Layout/SmoothScroll";
import CustomCursor from "@/components/UI/CustomCursor";

const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Aryan Gupta | AI/ML Engineer",
    description:
        "Portfolio of Aryan Gupta - AI/ML Engineer specializing in Machine Learning, Deep Learning, GenAI, Computer Vision, and Data Engineering.",
    keywords: [
        "Aryan Gupta",
        "AI Engineer",
        "ML Engineer",
        "Machine Learning",
        "Deep Learning",
        "GenAI",
        "Computer Vision",
        "Data Engineering",
        "Portfolio",
    ],
    authors: [{ name: "Aryan Gupta" }],
    openGraph: {
        title: "Aryan Gupta | AI/ML Engineer",
        description:
            "Portfolio of Aryan Gupta - AI/ML Engineer specializing in Machine Learning, Deep Learning, and Data Engineering.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="lenis">
            <body
                className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
            >
                <CustomCursor />
                <div className="grain-overlay" />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    );
}
