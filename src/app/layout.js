import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Stratego Kaartjes | Jeugdwerk",
  description:
    "Maak aan de hand van deze tool snel en gemakkelijk volledig aanpasbare stratego kaartjes!",
  keywords:
    "Stratego, Generator, Online, Stratego Kaartjes, Kaartjes, Levende Startego, Jeugdwerk, Disney Stratego, Disney, Studio 100 Stratego, Studio 100, Piraten, Piraten Stratego",
  "opengraph-image": "https://stratego.jeugdwerk.org/meta.png",
  "twitter-image": "https://stratego.jeugdwerk.org/meta.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + "  bg-gray-100"}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
