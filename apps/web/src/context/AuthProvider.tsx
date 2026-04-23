'use client';

import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth/auth';
import Link from 'next/link';

export function AuthProvider({ children }: React.PropsWithChildren) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => {
        router.refresh();
      }}
      Link={Link}
      social={{
        providers: ['google'],
      }}
    >
      {children}
    </AuthUIProvider>
  );
}
