import type { Metadata } from "next";
import "./globals.css";
import NextAuthProvider from "@/context/NextAuthContext";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Falcon Eye EMS",
  description: "Employee management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
