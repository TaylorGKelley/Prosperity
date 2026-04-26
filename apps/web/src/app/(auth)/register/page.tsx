'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, UserPlus } from 'lucide-react';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { authClient } from '@/lib/auth/auth';
import { toast } from 'sonner';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: '/',
      }, {
        onSuccess: () => {
          toast.success('Identity created successfully');
          router.push('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || 'Registration failed');
          setLoading(false);
        }
      });
    } catch (err) {
      toast.error('An unexpected error occurred');
      setLoading(false);
    }
  };

  return (
    <Card className='p-8 bg-background border-none shadow-xl'>
      <form onSubmit={handleRegister} className='space-y-6'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'>
              Full Identity Name
            </label>
            <div className='relative'>
              <User className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
              <Input
                type='text'
                placeholder='John Doe'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'>
              Credential Identifier
            </label>
            <div className='relative'>
              <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
              <Input
                type='email'
                placeholder='email@example.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
              />
            </div>
          </div>

          <div className='space-y-2'>
            <label className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'>
              Security Key
            </label>
            <div className='relative'>
              <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
              <Input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
              />
            </div>
          </div>
        </div>

        <Button 
          type='submit' 
          disabled={loading}
          className='w-full h-14 uppercase font-bold tracking-[0.2em] text-[10px]'
        >
          {loading ? (
            <Loader2 className='size-4 animate-spin' />
          ) : (
            <>Initialize Identity <UserPlus className='size-3 ml-2' /></>
          )}
        </Button>
      </form>

      <div className='mt-8 pt-8 border-t text-center'>
        <p className='text-xs text-muted-foreground mb-4'>Already have an authorized profile?</p>
        <Link href='/login'>
          <Button variant='outline' className='w-full h-12 border-2 uppercase font-bold tracking-widest text-[10px]'>
            Access Session
          </Button>
        </Link>
      </div>
    </Card>
  );
}
