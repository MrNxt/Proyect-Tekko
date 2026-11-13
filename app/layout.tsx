import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionProvider from "@/components/MotionProvider";

const orbitron = Orbitron({ subsets: ['latin'], weight: ['700'] });

export const metadata: Metadata = {
  title: "Tekko",
  description: "Project Tekko",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} bg-[#171711] text-white`}>
        <MotionProvider>
          <Navbar />
          <main>{children}</main>
        </MotionProvider>
      </body>
    </html>
  );
}
