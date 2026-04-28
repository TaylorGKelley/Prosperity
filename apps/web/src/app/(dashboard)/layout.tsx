import React from 'react';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/features/shared/components/layout/sidebar';
import { Navbar } from '@/features/shared/components/layout/navbar';
import { authClient } from '@/lib/auth/auth';
import { headers } from 'next/headers';
import { getSafeHeaders } from '@/lib/utils/headers';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: getSafeHeaders(await headers()),
    },
  });

  if (!session) {
    redirect('/login');
  }

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Navbar />
        <main className='flex-1 bg-[#FBF9F8]'>{children}</main>
      </div>
    </div>
  );
}
