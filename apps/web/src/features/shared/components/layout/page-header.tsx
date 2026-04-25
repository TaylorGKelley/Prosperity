import React from 'react';
import { cn } from '@/lib/utils/tw';

interface PageHeaderProps {
  title: string;
  description?: string;
  metricLabel?: string;
  metricValue?: string;
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  metricLabel,
  metricValue,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('flex items-end justify-between border-b pb-8', className)}>
      <div className='space-y-2'>
        <h1 className='text-4xl font-medium tracking-tighter font-serif'>{title}</h1>
        {description && (
          <p className='text-xs font-bold uppercase text-muted-foreground tracking-[0.2em]'>
            {description}
          </p>
        )}
      </div>
      
      <div className='flex flex-col items-end gap-6'>
        {metricValue && (
          <div className='text-right'>
            <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em] mb-1'>
              {metricLabel || 'Total'}
            </p>
            <h2 className='text-5xl font-medium tracking-tighter font-serif tabular-nums leading-none'>
              {metricValue}
            </h2>
          </div>
        )}
        {children && <div className='flex items-center gap-6'>{children}</div>}
      </div>
    </div>
  );
}
