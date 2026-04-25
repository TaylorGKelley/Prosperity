import React from 'react';
import { Sidebar } from '@/features/shared/components/layout/sidebar';
import { Navbar } from '@/features/shared/components/layout/navbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <main className='flex-1 bg-[#FBF9F8]'>
          {children}
        </main>
      </div>
    </div>
  );
}
