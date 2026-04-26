import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='min-h-screen bg-[#FBF9F8] flex flex-col items-center justify-center p-6'>
      <div className='w-full max-w-md space-y-8'>
        <div className='text-center space-y-2'>
          <h1 className='text-4xl font-medium tracking-tighter uppercase font-serif'>
            Prosperity
          </h1>
          <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-[0.3em]'>
            Personal Finance Protocol
          </p>
        </div>
        {children}
      </div>
      
      <div className='mt-20 text-[10px] font-bold uppercase text-muted-foreground tracking-widest opacity-40'>
        Secured via Better-Auth & Asymmetric Encryption
      </div>
    </div>
  );
}
