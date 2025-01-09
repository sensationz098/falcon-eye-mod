import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import NextAuthProvider from "@/context/NextAuthContext";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

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
        <NextTopLoader
          color="#9400FF"
          initialPosition={0.4}
          speed={400}
          crawlSpeed={300}
        />
        <NextAuthProvider>
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
