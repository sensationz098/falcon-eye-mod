import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  weight: ["200", "300", "400", "500"],
  subsets: ["latin"],
  display: "swap",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Falcon Eye EMS",
  description:
    "An Employee Management System (EMS) streamlines HR tasks like payroll, attendance, performance tracking, and employee data management for improved efficiency and organization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${poppins.className} bg-background antialiased`}>
        <NextTopLoader
          color="#9400FF"
          initialPosition={0.4}
          speed={400}
          crawlSpeed={300}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
