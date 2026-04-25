import React from 'react';
import { cn } from '@/lib/utils/tw';

interface CreditCardProps {
  last4: string;
  expiry: string;
  brand: string;
  holder: string;
  className?: string;
}

export function CreditCard({
  last4,
  expiry,
  brand,
  holder,
  className,
}: CreditCardProps) {
  return (
    <div
      className={cn(
        'relative w-full min-w-[280px] max-w-[400px] rounded-xl aspect-[1.586/1] bg-foreground text-background p-6 flex flex-col justify-between overflow-hidden shadow-2xl',
        className,
      )}
    >
      {/* Decorative background elements */}
      <div className='absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl' />
      <div className='absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16 blur-2xl' />

      <div className='flex justify-between items-start relative z-10'>
        <div className='space-y-1'>
          <p className='text-[8px] font-bold uppercase tracking-[0.3em] opacity-50'>
            Secured Credit
          </p>
          <div className='h-6 w-10 bg-white/10 rounded-sm border border-white/20 flex items-center justify-center overflow-hidden'>
            <div className='w-full h-[1px] bg-white/20 absolute rotate-45' />
            <div className='w-full h-[1px] bg-white/20 absolute -rotate-45' />
          </div>
        </div>
        <p className='text-[10px] font-bold italic tracking-wider opacity-80'>
          {brand}
        </p>
      </div>

      <div className='space-y-4 relative z-10'>
        <p className='text-lg sm:text-xl font-medium font-serif tracking-[0.2em] tabular-nums'>
          •••• •••• •••• {last4}
        </p>

        <div className='flex justify-between items-end'>
          <div className='space-y-1'>
            <p className='text-[7px] font-bold uppercase tracking-[0.2em] opacity-50'>
              Card Holder
            </p>
            <p className='text-[9px] font-bold uppercase tracking-widest truncate max-w-[150px]'>
              {holder}
            </p>
          </div>
          <div className='text-right space-y-1'>
            <p className='text-[7px] font-bold uppercase tracking-[0.2em] opacity-50'>
              Expires
            </p>
            <p className='text-[9px] font-bold tabular-nums tracking-widest'>
              {expiry}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
