import React from 'react';
import { type Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter-sans',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair-serif',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prosperity',
  description: 'Your personal finance tracker',
  openGraph: {
    title: 'Prosperity Budgeting',
    description:
      'A budgeting and finance tracking site, to help keep track of purchases and monthly spending.',
    url: '',
    siteName: 'Prosperity',
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {children}
        {/* <Toaster position='bottom-right' /> */}
      </body>
    </html>
  );
}
