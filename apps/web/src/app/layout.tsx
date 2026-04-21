import React from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prosperity",
  description: "Your personal finance tracker",
  openGraph: {
    title: "Prosperity Budgeting",
    description:
      "A budgeting and finance tracking site, to help keep track of purchases and monthly spending.",
    url: "",
    siteName: "Prosperity",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {/* <ThemeProvider attribute='class' defaultTheme='system' enableSystem> */}
          {children}
          {/* <Toaster position='bottom-right' /> */}
          {/* </ThemeProvider> */}
        </AuthProvider>
      </body>
    </html>
  );
}
