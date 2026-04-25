'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Clock, Target, Building2, User } from 'lucide-react';
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
    <aside className='w-64 border-r bg-[#F9F7F2] flex flex-col h-screen sticky top-0'>
      <div className='p-6'>
        <h1 className='text-2xl font-medium tracking-tighter uppercase font-serif'>
          Prosperity
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

      <div className='p-4 mt-auto border-t border-muted/50'>
        <Link 
          href='/account'
          className={cn(
            'flex items-center gap-3 w-full px-2 py-2 text-sm font-medium rounded-lg transition-colors group',
            pathname === '/account' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent hover:text-accent-foreground'
          )}
        >
          <div className='size-9 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10'>
            <User className='size-5 text-primary/70' />
          </div>
          <div className='flex-1 text-left'>
            <p className='text-sm font-bold leading-tight'>Taylor Kelley</p>
            <p className='text-[10px] text-muted-foreground uppercase tracking-widest font-bold'>Personal</p>
          </div>
        </Link>
      </div>
    </aside>
  );
}
