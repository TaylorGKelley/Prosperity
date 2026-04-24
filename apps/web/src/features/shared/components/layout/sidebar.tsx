'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Clock, Target, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils/tw';

const navItems = [
  { name: 'Command Center', icon: LayoutDashboard, href: '/' },
  { name: 'Transactions', icon: Clock, href: '/transactions' },
  { name: 'Budgets', icon: Target, href: '/budgets' },
  { name: 'Accounts', icon: Building2, href: '/accounts' },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className='w-64 border-r bg-background flex flex-col h-screen sticky top-0'>
      <div className='p-6'>
        <h1 className='text-2xl font-bold tracking-tighter uppercase font-serif'>
          The Ledger
        </h1>
      </div>

      <nav className='flex-1 px-4 space-y-2'>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground',
              pathname === item.href
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground',
            )}
          >
            <item.icon className='size-4' />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className='p-4 mt-auto'>
        <div className='rounded-lg bg-muted p-4'>
          <p className='text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2'>
            System Status
          </p>
          <div className='flex items-center gap-2'>
            <div className='size-2 rounded-full bg-emerald-500 animate-pulse' />
            <span className='text-sm font-medium'>Live & Secure</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
