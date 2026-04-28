'use client';

import React from 'react';
import Link from 'next/link';
import {
  Mail,
  Loader2,
  ArrowRight,
  AlertCircle,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';
import { useForm } from '@tanstack/react-form';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { authClient } from '@/lib/auth/auth';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const form = useForm({
    defaultValues: {
      email: '',
    },
    onSubmit: async ({ value }) => {
      setServerError(null);

      const { data, error } = await authClient.forgotPassword(
        {
          email: value.email,
          redirectTo: '/reset-password',
        },
        {
          onSuccess: () => {
            setIsSubmitted(true);
            toast.success('Recovery link dispatched');
          },
          onError: (ctx) => {
            setServerError(ctx.error.message || 'Recovery request failed');
            toast.error(ctx.error.message || 'Recovery request failed');
          },
        },
      );
    },
  });

  if (isSubmitted) {
    return (
      <Card className='p-10 bg-background border-none shadow-xl text-center space-y-6'>
        <div className='flex justify-center'>
          <div className='p-4 bg-emerald-500/10 rounded-full'>
            <CheckCircle2 className='size-10 text-emerald-500' />
          </div>
        </div>
        <div className='space-y-2'>
          <h2 className='text-2xl font-medium font-serif'>
            Recovery Dispatched
          </h2>
          <p className='text-sm text-muted-foreground leading-relaxed'>
            If an identity exists for{' '}
            <span className='text-foreground font-bold'>
              {form.state.values.email}
            </span>
            , a secure recovery protocol has been initiated. Check your inbox
            for further instructions.
          </p>
        </div>
        <div className='pt-4'>
          <Link href='/login'>
            <Button
              variant='outline'
              className='w-full h-12 border-2 uppercase font-bold tracking-widest text-[10px]'
            >
              Return to Access Session
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className='p-8 bg-background border-none shadow-xl'>
      <div className='mb-8'>
        <Link
          href='/login'
          className='flex items-center text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors mb-6'
        >
          <ChevronLeft className='size-3 mr-1' /> Back to Login
        </Link>
        <h2 className='text-2xl font-medium font-serif mb-2'>
          Identity Recovery
        </h2>
        <p className='text-xs text-muted-foreground leading-relaxed'>
          Initiate a secure protocol to reset your security key and regain
          access to your Prosperity portfolio.
        </p>
      </div>

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

        <form.Field
          name='email'
          children={(field) => (
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
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type='submit'
              disabled={!canSubmit || isSubmitting}
              className='w-full h-14 uppercase font-bold tracking-[0.2em] text-[10px]'
            >
              {isSubmitting ? (
                <Loader2 className='size-4 animate-spin' />
              ) : (
                <>
                  Initiate Recovery <ArrowRight className='size-3 ml-2' />
                </>
              )}
            </Button>
          )}
        />
      </form>
    </Card>
  );
}
