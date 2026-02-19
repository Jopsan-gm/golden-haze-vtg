import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const playfair = Playfair_Display({
    variable: "--font-playfair",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Golden haze Vtg | Vintage & Curated Store",
    description: "Descubre prendas únicas con historia. Golden haze Vtg, moda sostenible y vintage.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${inter.variable} ${playfair.variable} antialiased selection:bg-vintage-gold selection:text-white`}>
                {children}
            </body>
        </html>
    );
}
