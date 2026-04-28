'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, Loader2, UserPlus, AlertCircle } from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { authClient } from '@/lib/auth/auth';
import { toast } from 'sonner';

export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const { data, error } = await authClient.signUp.email(
        {
          email: value.email,
          password: value.password,
          name: value.name,
          callbackURL: '/',
        },
        {
          onSuccess: () => {
            toast.success('Identity created successfully');
            router.push('/');
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || 'Registration failed');
            toast.error(ctx.error.message || 'Registration failed');
          },
        },
      );
    },
  });

  return (
    <Card className='p-8 bg-background border-none shadow-xl'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className='space-y-6'
      >
        {serverError && (
          <div className='p-3 bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-bold uppercase tracking-widest flex items-center gap-2'>
            <AlertCircle className='size-3' />
            {serverError}
          </div>
        )}

        <div className='space-y-4'>
          <form.Field name='name'>
            {(field) => (
              <div className='space-y-2'>
                <label
                  className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'
                  htmlFor={field.name}
                >
                  Full Identity Name
                </label>
                <div className='relative'>
                  <User className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='John Doe'
                    required
                    className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name='email'>
            {(field) => (
              <div className='space-y-2'>
                <label
                  className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'
                  htmlFor={field.name}
                >
                  Credential Identifier
                </label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                  <Input
                    id={field.name}
                    name={field.name}
                    type='email'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='email@example.com'
                    required
                    className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
                  />
                </div>
              </div>
            )}
          </form.Field>

          <form.Field name='password'>
            {(field) => (
              <div className='space-y-2'>
                <label
                  className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1'
                  htmlFor={field.name}
                >
                  Security Key
                </label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
                  <Input
                    id={field.name}
                    name={field.name}
                    type='password'
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='••••••••'
                    required
                    className='pl-10 h-12 rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent focus-visible:ring-0 text-sm font-medium'
                  />
                </div>
              </div>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              disabled={!canSubmit || isSubmitting}
              className='w-full h-14 uppercase font-bold tracking-[0.2em] text-[10px]'
            >
              {isSubmitting ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <>
                  Initialize Identity <UserPlus className='size-3 ml-2' />
                </>
              )}
            </Button>
          )}
        </form.Subscribe>
      </form>

      <div className='mt-8 pt-8 border-t text-center'>
        <p className='text-xs text-muted-foreground mb-4'>
          Already have an authorized profile?
        </p>
        <Link href='/login'>
          <Button
            variant='outline'
            className='w-full h-12 border-2 uppercase font-bold tracking-widest text-[10px]'
          >
            Access Session
          </Button>
        </Link>
      </div>
    </Card>
  );
}
