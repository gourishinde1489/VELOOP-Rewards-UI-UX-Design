import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const poppins = Poppins({ weight: ["400", "500", "600", "700"], subsets: ["latin"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "VELOOP Rewards — Mine & EARN",
  description: "Web3 passive reward mining experience and 10-Level 3D Achievement Badge System.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} ${poppins.variable}`}>
      <body className="bg-[#161827] text-[#f5f3ed] min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
