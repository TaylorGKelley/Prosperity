import React from 'react';
import {
  ArrowUpRight,
  TrendingUp,
  TrendingDown,
  Target,
  ArrowUpCircle,
  ArrowDownCircle,
  AlertCircle,
  ChevronRight,
  Building2,
  DollarSign,
  Lightbulb,
} from 'lucide-react';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { PageHeader } from '@/features/shared/components/layout/page-header';
import { NetWorthTrend } from '@/features/shared/components/ui/net-worth-trend';
import { cn } from '@/lib/utils/tw';
import { Separator } from '@/features/shared/components/ui/separator';

export default function OverviewPage() {
  return (
    <div className='p-10 space-y-10 max-w-7xl mx-auto'>
      <PageHeader
        title='Financial Summary'
        description='Consolidated overview of capital and expenditure flow.'
        metricLabel='Net Worth'
        metricValue='$1,248,302.00'
      >
        <div className='flex gap-4 self-center mr-8'>
          {['Overview', 'Expenditure', 'Growth'].map((tab) => (
            <button
              key={tab}
              className={cn(
                'text-[10px] font-bold uppercase tracking-[0.2em] transition-colors',
                tab === 'Overview'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </PageHeader>

      <div className='grid grid-cols-12 gap-10'>
        {/* Left Column: Expenditure Flow & Recent Activity */}
        <div className='col-span-12 lg:col-span-8 space-y-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            <Card className='border-l-4 border-l-primary p-6'>
              <div className='space-y-4'>
                <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                  Expenditure Flow
                </h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-medium font-serif'>
                    $4,120.00
                  </span>
                  <span className='text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5'>
                    <TrendingDown className='size-3' />
                    12%
                  </span>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between text-[10px] font-bold uppercase tracking-widest'>
                    <span className='text-muted-foreground'>
                      Allocated: $6,000
                    </span>
                    <span>Remaining: $1,880</span>
                  </div>
                  <div className='h-1.5 w-full bg-muted overflow-hidden'>
                    <div className='h-full bg-primary w-[68%]' />
                  </div>
                </div>
              </div>
            </Card>

            <Card className='border-l-4 border-l-muted p-6'>
              <div className='space-y-4'>
                <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>
                  Portfolio Growth
                </h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-medium font-serif'>+4.2%</span>
                  <span className='text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5'>
                    <TrendingUp className='size-3' />
                    $52,400
                  </span>
                </div>
                <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                  Core Assets Increasing
                </p>
              </div>
            </Card>
          </div>

          <section className='space-y-6'>
            <div className='flex items-center justify-between border-b pb-4'>
              <h3 className='text-xl font-medium tracking-tight font-serif'>
                Recent Activity
              </h3>
              <div className='flex gap-6'>
                <Button variant='link' className='px-0'>
                  Archive
                </Button>
                <Button variant='link' className='px-0'>
                  Configuration
                </Button>
              </div>
            </div>

            <div className='divide-y'>
              {[
                {
                  date: 'OCT 14',
                  name: 'Equinox Hudson Yards',
                  category: 'LIFESTYLE',
                  amount: '-$245.00',
                  status: '$2,880 / $4,000',
                },
                {
                  date: 'OCT 12',
                  name: 'Apple Store Fifth Ave',
                  category: 'ELECTRONICS',
                  amount: '-$1,299.00',
                  status: '$5,400 / $6,000',
                },
                {
                  date: 'OCT 11',
                  name: 'Dividends: VTSAX',
                  category: 'INVESTMENTS',
                  amount: '+$842.15',
                  status: '$12,000 / $15,000',
                },
                {
                  date: 'OCT 10',
                  name: 'Balthazar Restaurant',
                  category: 'DINING',
                  amount: '-$312.40',
                  status: 'Dining',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className='group flex items-center justify-between py-4'
                >
                  <div className='flex items-center gap-8'>
                    <span className='text-[10px] font-bold text-muted-foreground w-12 tabular-nums'>
                      {item.date}
                    </span>
                    <div>
                      <p className='font-bold group-hover:underline cursor-pointer'>
                        {item.name}
                      </p>
                      <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                        {item.category}
                      </p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p
                      className={cn(
                        'font-bold tabular-nums',
                        item.amount.startsWith('+')
                          ? 'text-emerald-500'
                          : 'text-foreground',
                      )}
                    >
                      {item.amount}
                    </p>
                    <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>
                      {item.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant='outline'
              className='w-full h-14 border-2 font-bold uppercase tracking-widest'
            >
              View Full Statement
            </Button>
          </section>
        </div>

        {/* Right Column: KPIs & Goals */}
        <div className='col-span-12 lg:col-span-4 space-y-10'>
          {/* Card 1: Net Worth */}
          <Card className='p-8 bg-background'>
            <div className='space-y-6'>
              <div className='flex justify-between items-start'>
                <h3 className='text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground'>Net Worth Analysis</h3>
                <span className='text-[10px] font-bold text-emerald-500 uppercase tracking-widest'>+2.4% MoM</span>
              </div>
              <div className='space-y-1'>
                <p className='text-3xl font-medium font-serif'>$1,248,302</p>
                <p className='text-[10px] font-bold text-muted-foreground uppercase tracking-widest'>Current Month Projection</p>
              </div>
              <NetWorthTrend />
            </div>
          </Card>

          {/* Card 2: Cash Flow */}
          <Card className='p-8 bg-background'>
            <div className='space-y-6'>
              <h3 className='text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground'>Monthly Cash Flow</h3>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-emerald-500'>
                    <ArrowUpCircle className='size-4' />
                    <span className='text-[9px] font-bold uppercase tracking-widest'>Inflow</span>
                  </div>
                  <p className='text-xl font-medium font-serif'>$14,250</p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2 text-primary'>
                    <ArrowDownCircle className='size-4' />
                    <span className='text-[9px] font-bold uppercase tracking-widest'>Outflow</span>
                  </div>
                  <p className='text-xl font-medium font-serif'>$8,120</p>
                </div>
              </div>
              <div className='pt-4 border-t'>
                <div className='flex justify-between items-end'>
                  <p className='text-[9px] font-bold text-muted-foreground uppercase tracking-widest'>Net Savings</p>
                  <p className='text-sm font-bold text-emerald-500'>+$6,130</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Card 3: Budget Progress */}
          <Card className='p-8 bg-background'>
            <div className='space-y-6'>
              <div className='flex justify-between items-center'>
                <h3 className='text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground'>Budget Progress</h3>
                <AlertCircle className='size-4 text-amber-500' />
              </div>

              <div className='space-y-4'>
                {[
                  { label: 'Lifestyle', spent: 2880, limit: 4000, color: 'bg-primary' },
                  { label: 'Dining', spent: 1240, limit: 1200, color: 'bg-destructive' },
                ].map((b) => (
                  <div key={b.label} className='space-y-2'>
                    <div className='flex justify-between text-[10px] font-bold uppercase tracking-widest'>
                      <span>{b.label}</span>
                      <span className={cn(b.spent > b.limit ? 'text-destructive' : 'text-muted-foreground')}>
                        ${b.spent} / ${b.limit}
                      </span>
                    </div>
                    <div className='h-1 w-full bg-muted'>
                      <div 
                        className={cn('h-full', b.color)} 
                        style={{ width: `${Math.min((b.spent / b.limit) * 100, 100)}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button variant='link' className='px-0 text-[9px] h-auto'>Analyze Categories</Button>
            </div>
          </Card>

          {/* Card 4: Financial Goals */}
          <Card className='p-8 bg-foreground text-background'>
            <div className='space-y-6'>
              <div className='flex items-center gap-3'>
                <Target className='size-4 opacity-50' />
                <h3 className='text-[10px] font-bold uppercase tracking-[0.3em] opacity-50'>Active Goals</h3>
              </div>

              <div className='space-y-6'>
                {[
                  { label: 'Emergency Fund', current: 45000, target: 50000 },
                  { label: 'Travel: Tokyo 2027', current: 8200, target: 12000 },
                ].map((g) => (
                  <div key={g.label} className='space-y-3'>
                    <div className='flex justify-between items-end'>
                      <p className='text-sm font-medium font-serif'>{g.label}</p>
                      <p className='text-[10px] font-bold tabular-nums tracking-widest opacity-70'>
                        {Math.round((g.current / g.target) * 100)}%
                      </p>
                    </div>
                    <div className='h-1 w-full bg-background/10'>
                      <div 
                        className='h-full bg-background' 
                        style={{ width: `${(g.current / g.target) * 100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
