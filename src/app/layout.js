import { Manrope, Playfair_Display } from "next/font/google";
import AuthBootstrap from "@/components/auth/AuthBootstrap";
import StoreProvider from "@/store/provider";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio | Rayan Terki",
  description:
    "Portfolio Next.js de Rayan Terki avec authentification, projets dynamiques et temoignages.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <StoreProvider>
          <AuthBootstrap />
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
