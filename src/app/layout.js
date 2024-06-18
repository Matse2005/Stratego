import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stratego Kaartjes",
  description:
    "Maak aan de hand van deze tool snel en gemakkelijk volledig aanpasbare stratego kaartjes!",
  keywords:
    "Stratego, Generator, Online, Stratego Kaartjes, Kaartjes, Levende Startego, Jeugdwerk",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "  bg-gray-100"}>{children}</body>
    </html>
  );
}
