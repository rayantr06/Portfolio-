import { Manrope, Playfair_Display } from "next/font/google";
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
    "Rayan Terki, software developer in Canada. Python, C# and TypeScript; backend, full-stack development and applied AI.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${manrope.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
