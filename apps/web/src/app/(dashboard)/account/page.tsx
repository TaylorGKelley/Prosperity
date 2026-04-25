'use client';

import React, { useState } from 'react';
import {
  User,
  Shield,
  ChevronRight,
  Bell,
  Globe,
  Moon,
  Sun,
  Monitor,
  Check,
  CreditCard as CardIcon,
} from 'lucide-react';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Badge } from '@/features/shared/components/ui/badge';
import { CreditCard } from '@/features/shared/components/ui/credit-card';
import { PageHeader } from '@/features/shared/components/layout/page-header';
import { cn } from '@/lib/utils/tw';

type Tab = 'profile' | 'security' | 'preferences' | 'subscription';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');

  return (
    <div className='p-10 space-y-10 max-w-5xl mx-auto'>
      <PageHeader
        title='Account Settings'
        description='Manage your personal profile, security protocols, and system preferences.'
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
        {/* Navigation Sidebar */}
        <div className='space-y-2'>
          {[
            { id: 'profile', label: 'Personal Profile' },
            { id: 'security', label: 'Security & Auth' },
            { id: 'preferences', label: 'Preferences' },
            { id: 'subscription', label: 'Subscription' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={cn(
                'flex items-center justify-between w-full px-4 py-3 text-sm font-bold uppercase tracking-widest text-[10px] transition-colors',
                activeTab === tab.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:bg-muted/50',
              )}
            >
              {tab.label} <ChevronRight className='size-3' />
            </button>
          ))}
        </div>

        <div className='md:col-span-2'>
          {activeTab === 'profile' && (
            <div className='space-y-10'>
              <Card className='border-none bg-background p-8'>
                <div className='flex items-center gap-6 mb-10'>
                  <div className='size-20 bg-muted flex items-center justify-center border-2 border-muted-foreground/10'>
                    <User className='size-10 text-muted-foreground/50' />
                  </div>
                  <div>
                    <h3 className='text-2xl font-medium font-serif mb-1'>
                      Taylor Kelley
                    </h3>
                    <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                      Member since April 2026
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    className='ml-auto h-10 px-6 border-2 uppercase font-bold tracking-widest text-[10px]'
                  >
                    Change Avatar
                  </Button>
                </div>

                <div className='space-y-8'>
                  <div className='grid grid-cols-2 gap-8'>
                    <div className='space-y-3'>
                      <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                        Full Name
                      </p>
                      <Input
                        defaultValue='Taylor Kelley'
                        className='rounded-none border-x-0 border-t-0 border-b-2 border-muted shadow-none focus-visible:ring-0 px-0 h-10 bg-transparent text-sm font-medium'
                      />
                    </div>
                    <div className='space-y-3'>
                      <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                        Email Address
                      </p>
                      <Input
                        defaultValue='taylor@example.com'
                        className='rounded-none border-x-0 border-t-0 border-b-2 border-muted shadow-none focus-visible:ring-0 px-0 h-10 bg-transparent text-sm font-medium'
                      />
                    </div>
                  </div>

                  <div className='space-y-3'>
                    <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                      Professional Bio
                    </p>
                    <textarea
                      className='w-full rounded-none border-x-0 border-t-0 border-b-2 border-muted shadow-none focus-visible:ring-0 px-0 py-2 bg-transparent text-sm font-medium min-h-[100px] resize-none'
                      defaultValue='Senior Systems Architect focusing on capital efficiency and personal wealth optimization.'
                    />
                  </div>

                  <div className='flex justify-end gap-4 pt-4'>
                    <Button
                      variant='ghost'
                      className='h-12 px-8 uppercase font-bold tracking-widest text-[10px]'
                    >
                      Discard
                    </Button>
                    <Button className='h-12 px-10 uppercase font-bold tracking-widest text-[10px]'>
                      Save Profile
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <Card className='border-none bg-background p-8'>
              <div className='flex items-center gap-4 mb-8'>
                <div className='p-3 bg-muted/50 border border-muted-foreground/10'>
                  <Shield className='size-5' />
                </div>
                <h3 className='text-xl font-medium font-serif'>
                  Security Protocol
                </h3>
              </div>

              <div className='space-y-6'>
                <div className='flex items-center justify-between py-4 border-b'>
                  <div className='space-y-1'>
                    <p className='text-sm font-bold'>
                      Two-Factor Authentication
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Authenticator app configured and active.
                    </p>
                  </div>
                  <Badge className='bg-emerald-500 text-white rounded-none uppercase text-[8px] font-bold tracking-widest px-2'>
                    Enabled
                  </Badge>
                </div>

                <div className='flex items-center justify-between py-4 border-b'>
                  <div className='space-y-1'>
                    <p className='text-sm font-bold'>Passkey Access</p>
                    <p className='text-xs text-muted-foreground'>
                      Biometric login active on 2 devices.
                    </p>
                  </div>
                  <Button variant='link' className='p-0 text-foreground'>
                    Manage
                  </Button>
                </div>

                <div className='flex items-center justify-between py-4'>
                  <div className='space-y-1'>
                    <p className='text-sm font-bold'>Master Password</p>
                    <p className='text-xs text-muted-foreground'>
                      Last rotated 32 days ago.
                    </p>
                  </div>
                  <Button
                    variant='outline'
                    className='h-9 px-4 border-2 uppercase font-bold tracking-widest text-[10px]'
                  >
                    Rotate Key
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <div className='space-y-10'>
              {/* Regional Preferences */}
              <Card className='border-none bg-background p-8'>
                <div className='flex items-center gap-4 mb-8'>
                  <div className='p-3 bg-muted/50 border border-muted-foreground/10'>
                    <Globe className='size-5' />
                  </div>
                  <h3 className='text-xl font-medium font-serif'>
                    Regional & Localization
                  </h3>
                </div>

                <div className='space-y-8'>
                  <div className='grid grid-cols-2 gap-8'>
                    <div className='space-y-3'>
                      <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                        Primary Currency
                      </p>
                      <select className='w-full rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent h-10 text-sm font-medium focus:outline-none'>
                        <option value='USD'>USD - US Dollar</option>
                        <option value='EUR'>EUR - Euro</option>
                        <option value='GBP'>GBP - British Pound</option>
                        <option value='JPY'>JPY - Japanese Yen</option>
                      </select>
                    </div>
                    <div className='space-y-3'>
                      <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                        Date Format
                      </p>
                      <select className='w-full rounded-none border-x-0 border-t-0 border-b-2 border-muted bg-transparent h-10 text-sm font-medium focus:outline-none'>
                        <option value='MDY'>MMM DD, YYYY</option>
                        <option value='DMY'>DD MMM, YYYY</option>
                        <option value='YMD'>YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Interface Section */}
              <Card className='border-none bg-background p-8'>
                <div className='flex items-center gap-4 mb-8'>
                  <div className='p-3 bg-muted/50 border border-muted-foreground/10'>
                    <Monitor className='size-5' />
                  </div>
                  <h3 className='text-xl font-medium font-serif'>
                    Interface Appearance
                  </h3>
                </div>

                <div className='grid grid-cols-3 gap-4'>
                  {[
                    { id: 'light', label: 'Light', icon: Sun },
                    { id: 'dark', label: 'Dark', icon: Moon },
                    { id: 'system', label: 'System', icon: Monitor },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      className={cn(
                        'flex flex-col items-center justify-center p-6 border-2 transition-all gap-3',
                        theme.id === 'light'
                          ? 'border-foreground bg-muted/20'
                          : 'border-muted hover:border-muted-foreground/30',
                      )}
                    >
                      <theme.icon className='size-6' />
                      <span className='text-[10px] font-bold uppercase tracking-widest'>
                        {theme.label}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Notifications */}
              <Card className='border-none bg-background p-8'>
                <div className='flex items-center gap-4 mb-8'>
                  <div className='p-3 bg-muted/50 border border-muted-foreground/10'>
                    <Bell className='size-5' />
                  </div>
                  <h3 className='text-xl font-medium font-serif'>
                    Notification Logic
                  </h3>
                </div>

                <div className='space-y-4'>
                  {[
                    {
                      label: 'Weekly Performance Summaries',
                      desc: 'Detailed analysis of capital flow every Monday.',
                    },
                    {
                      label: 'Unusual Activity Alerts',
                      desc: 'Instant notification for transactions exceeding $2,500.',
                    },
                    {
                      label: 'Budget Threshold Warnings',
                      desc: 'Alert when category spending reaches 80% of limit.',
                    },
                  ].map((pref, i) => (
                    <div
                      key={i}
                      className='flex items-start justify-between py-4 border-b last:border-0'
                    >
                      <div className='space-y-1'>
                        <p className='text-sm font-bold'>{pref.label}</p>
                        <p className='text-xs text-muted-foreground'>
                          {pref.desc}
                        </p>
                      </div>
                      <div className='size-6 border-2 border-foreground flex items-center justify-center bg-foreground text-background'>
                        <Check className='size-4' />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className='space-y-10'>
              <Card className='border-none bg-background p-8'>
                <div className='flex items-center gap-4 mb-8'>
                  <div className='p-3 bg-muted/50 border border-muted-foreground/10'>
                    <CardIcon className='size-5' />
                  </div>
                  <h3 className='text-xl font-medium font-serif'>
                    Subscription Management
                  </h3>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
                  <div className='space-y-6'>
                    <div>
                      <Badge className='bg-foreground text-background rounded-none uppercase text-[8px] font-bold tracking-widest px-3 mb-2'>
                        Professional Tier
                      </Badge>
                      <h4 className='text-2xl font-medium font-serif'>
                        $120.00{' '}
                        <span className='text-sm text-muted-foreground font-sans'>
                          / year
                        </span>
                      </h4>
                    </div>

                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      Your professional license grants access to advanced
                      capital flow analysis, unlimited institution connectivity,
                      and priority security audits.
                    </p>

                    <div className='pt-4 flex gap-4'>
                      <Button
                        variant='outline'
                        className='h-10 px-6 border-2 uppercase font-bold tracking-widest text-[10px]'
                      >
                        Cancel Tier
                      </Button>
                      <Button className='h-10 px-6 uppercase font-bold tracking-widest text-[10px]'>
                        Billing History
                      </Button>
                    </div>
                  </div>

                  <div className='flex flex-col items-center gap-4'>
                    <CreditCard
                      last4='8241'
                      expiry='04/29'
                      brand='VISA'
                      holder='Taylor Kelley'
                      className='max-w-[320px]'
                    />
                    <p className='text-[9px] font-bold uppercase tracking-widest text-muted-foreground'>
                      Primary Payment Method
                    </p>
                  </div>
                </div>
              </Card>

              <div className='bg-muted/30 p-8 border-l-4 border-foreground space-y-4'>
                <p className='text-[10px] font-bold uppercase tracking-widest text-muted-foreground'>
                  Next Transaction
                </p>
                <div className='flex justify-between items-end'>
                  <div>
                    <p className='text-xl font-medium font-serif'>
                      April 24, 2027
                    </p>
                    <p className='text-xs text-muted-foreground'>
                      Annual renewal via Stripe protocol
                    </p>
                  </div>
                  <Button variant='link' className='p-0 text-foreground'>
                    Change frequency
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
