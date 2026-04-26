import React from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { Sidebar } from '@/features/shared/components/layout/sidebar';
import { Navbar } from '@/features/shared/components/layout/navbar';
import { authClient } from '@/lib/auth/auth';
import { env } from '@/lib/env';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('DEBUG: NEXT_PUBLIC_API_URL is', env.NEXT_PUBLIC_API_URL);
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
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
        <main className='flex-1 bg-[#FBF9F8]'>
          {children}
        </main>
      </div>
    </div>
  );
}
