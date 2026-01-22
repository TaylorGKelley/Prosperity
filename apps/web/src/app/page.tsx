'use client';

import Image from 'next/image';
import { authClient } from './lib/auth/auth';
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  // better-auth example
  const { data: session, isPending } = authClient.useSession();
  const [activeForm, setActiveForm] = useState<'login' | 'signup'>('login');

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  } else if (session) {
    return (
      <div className="flex justify-center items-center">
        <h1>Welcome, {session.user.name}</h1>
        <button
          className="border border-red-500 text-red-500 p-4 rounded-lg"
          onClick={() => authClient.signOut()}>
          Signout
        </button>
      </div>
    );
  }

  return (
    <div className="container flex justify-center items-center">
      <button onClick={() => setActiveForm('login')}>Login</button>
    </div>
  );
}
