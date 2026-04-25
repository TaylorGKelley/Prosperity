import React from 'react';

export function NetWorthTrend() {
  return (
    <div className='flex items-end gap-1 h-8'>
      {[40, 45, 42, 48, 55, 52, 60, 65, 62, 70, 75, 80].map((h, i) => (
        <div 
          key={i} 
          className='w-full bg-emerald-500/20 rounded-t-sm' 
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
