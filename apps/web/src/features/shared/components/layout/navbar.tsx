import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/features/shared/components/ui/input';

export function Navbar() {
  const date = new Date('2026-04-23')
    .toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    })
    .toUpperCase();

  return (
    <header className='h-16 border-b bg-white/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-50'>
      <div className='flex items-center gap-4 w-1/3'>
        <div className='relative w-full max-w-sm'>
          <Search className='absolute left-2.5 top-2.5 size-4 text-muted-foreground' />
          <Input
            placeholder='Search accounts...'
            className='pl-9 bg-muted/50 border-none shadow-none focus-visible:ring-1'
          />
        </div>
      </div>

      <div className='w-1/3 text-right'>
        <p className='text-xs font-medium uppercase tracking-wider'>{date}</p>
      </div>
    </header>
  );
}
