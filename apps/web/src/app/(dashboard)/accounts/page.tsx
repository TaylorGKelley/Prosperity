import React from 'react';
import { 
  Building2, 
  RefreshCcw, 
  ExternalLink, 
  ShieldCheck,
  Plus,
  Landmark,
  CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Badge } from '@/features/shared/components/ui/badge';
import { PageHeader } from '@/features/shared/components/layout/page-header';

const institutions = [
  {
    name: 'J.P. Morgan Chase',
    type: 'Checking & Savings',
    logo: Landmark,
    accounts: [
      { name: 'Private Client Checking', balance: 42840.12, number: '•••• 8241', status: 'Synced' },
      { name: 'Platinum Savings', balance: 250000.00, number: '•••• 1102', status: 'Synced' },
    ]
  },
  {
    name: 'American Express',
    type: 'Credit Cards',
    logo: CreditCard,
    accounts: [
      { name: 'The Platinum Card®', balance: -4120.45, number: '•••• 1007', status: 'Synced' },
      { name: 'Gold Card', balance: -842.20, number: '•••• 2004', status: 'Delayed' },
    ]
  },
  {
    name: 'Vanguard Group',
    type: 'Brokerage & Retirement',
    logo: Building2,
    accounts: [
      { name: 'Individual Brokerage', balance: 842100.50, number: '•••• 9942', status: 'Synced' },
      { name: 'Roth IRA', balance: 112500.00, number: '•••• 4412', status: 'Synced' },
    ]
  }
];

export default function AccountsPage() {
  return (
    <div className='p-10 space-y-10 max-w-7xl mx-auto'>
      <PageHeader 
        title="Asset Portfolio"
        description="Direct connectivity with established financial institutions."
        metricLabel="Global Liquidity"
        metricValue="$1,248,302.00"
      >
        <div className='flex items-center gap-6 mr-4 self-center'>
          <div className='text-right'>
            <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em] mb-1'>Sync Status</p>
            <p className='text-[10px] font-bold uppercase tabular-nums'>42m ago</p>
          </div>
          <Button variant='outline' className='h-10 px-4 border-2 font-bold uppercase tracking-widest text-[10px]'>
            <RefreshCcw className='size-3 mr-2' /> Refresh
          </Button>
        </div>
      </PageHeader>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10'>
        {institutions.map((inst) => (
          <Card key={inst.name} className='flex flex-col p-8 bg-background'>
            <div className='flex items-center justify-between mb-8'>
              <div className='p-4 bg-muted/50 border border-muted-foreground/10'>
                <inst.logo className='size-6' />
              </div>
              <Badge variant='secondary' className='rounded-none uppercase text-[8px] font-bold tracking-[0.2em] px-3 py-1'>
                {inst.type}
              </Badge>
            </div>
            
            <h3 className='text-2xl font-bold font-serif mb-8'>{inst.name}</h3>
            
            <div className='flex-1 space-y-8'>
              {inst.accounts.map((acc) => (
                <div key={acc.name} className='group space-y-2'>
                  <div className='flex justify-between items-start'>
                    <div className='space-y-1'>
                      <p className='text-sm font-bold group-hover:underline cursor-pointer leading-none'>{acc.name}</p>
                      <p className='text-[10px] font-bold text-muted-foreground tracking-widest'>{acc.number}</p>
                    </div>
                    <div className='text-right space-y-1'>
                      <p className='font-bold tabular-nums font-serif'>
                        {acc.balance.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                      </p>
                      <div className='flex items-center justify-end gap-2'>
                        <div className={`size-1.5 rounded-full ${acc.status === 'Synced' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        <span className='text-[9px] font-bold uppercase tracking-widest text-muted-foreground'>{acc.status}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className='pt-8 border-t mt-8'>
              <Button variant='link' className='px-0 text-muted-foreground hover:text-foreground'>
                Institution Portal <ExternalLink className='size-3 ml-2' />
              </Button>
            </div>
          </Card>
        ))}

        <button className='group relative aspect-[4/5] border-2 border-dashed border-muted hover:border-primary transition-all duration-300 flex flex-col items-center justify-center p-10 gap-6 bg-muted/5'>
          <div className='size-16 border-2 border-dashed border-muted group-hover:border-primary group-hover:rotate-90 flex items-center justify-center transition-all duration-500'>
            <Plus className='size-8 text-muted-foreground group-hover:text-primary transition-colors' />
          </div>
          <div className='text-center space-y-2'>
            <p className='text-xs font-bold uppercase tracking-[0.3em]'>Connect Institution</p>
            <p className='text-[10px] text-muted-foreground tracking-widest'>Securely link via Teller Protocol</p>
          </div>
        </button>
      </div>

      <div className='bg-muted/30 p-10 border-l-4 border-emerald-500 flex flex-col md:flex-row items-center justify-between gap-8'>
        <div className='flex gap-8 items-center'>
          <div className='p-4 bg-emerald-500/10 rounded-none border border-emerald-500/20'>
            <ShieldCheck className='size-10 text-emerald-500' />
          </div>
          <div className='space-y-2'>
            <h4 className='text-xs font-bold uppercase tracking-[0.2em]'>Bank-Grade Security Protocols</h4>
            <p className='text-sm text-muted-foreground max-w-xl leading-relaxed'>
              Your credentials are never stored. We employ end-to-end asymmetric encryption and the <span className='text-foreground font-bold'>Teller Protocol</span> to securely synchronize your financial data.
            </p>
          </div>
        </div>
        <Button variant='outline' className='h-14 px-10 border-2 uppercase font-bold tracking-[0.2em] text-[10px]'>
          Security Audit
        </Button>
      </div>
    </div>
  );
}
