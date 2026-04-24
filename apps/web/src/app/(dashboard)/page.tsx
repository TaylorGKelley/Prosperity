import React from 'react';
import { 
  ArrowUpRight, 
  TrendingUp, 
  TrendingDown, 
  ChevronRight,
  Lightbulb,
  Building2,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Separator } from '@/features/shared/components/ui/separator';
import { PageHeader } from '@/features/shared/components/layout/page-header';
import { cn } from '@/lib/utils/tw';

export default function OverviewPage() {
  return (
    <div className='p-10 space-y-10 max-w-7xl mx-auto'>
      <PageHeader 
        title="Financial Summary"
        description="Consolidated overview of capital and expenditure flow."
        metricLabel="Net Worth"
        metricValue="$1,248,302.00"
      >
        <div className='flex gap-4 self-center mr-8'>
          {['Overview', 'Expenditure', 'Growth'].map((tab) => (
            <button 
              key={tab} 
              className={cn(
                'text-[10px] font-bold uppercase tracking-[0.2em] transition-colors',
                tab === 'Overview' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
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
                <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>Expenditure Flow</h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-bold font-serif'>$4,120.00</span>
                  <span className='text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5'>
                    <TrendingDown className='size-3' />
                    12%
                  </span>
                </div>
                <div className='space-y-2'>
                  <div className='flex justify-between text-[10px] font-bold uppercase tracking-widest'>
                    <span className='text-muted-foreground'>Allocated: $6,000</span>
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
                <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>Portfolio Growth</h3>
                <div className='flex items-baseline gap-3'>
                  <span className='text-4xl font-bold font-serif'>+4.2%</span>
                  <span className='text-xs font-bold text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5'>
                    <TrendingUp className='size-3' />
                    $52,400
                  </span>
                </div>
                <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>Core Assets Increasing</p>
              </div>
            </Card>
          </div>

          <section className='space-y-6'>
            <div className='flex items-center justify-between border-b pb-4'>
              <h3 className='text-xl font-bold tracking-tight font-serif'>Recent Activity</h3>
              <div className='flex gap-6'>
                <Button variant='link' className='px-0'>Archive</Button>
                <Button variant='link' className='px-0'>Configuration</Button>
              </div>
            </div>
            
            <div className='divide-y'>
              {[
                { date: 'OCT 14', name: 'Equinox Hudson Yards', category: 'LIFESTYLE', amount: '-$245.00', status: '$2,880 / $4,000' },
                { date: 'OCT 12', name: 'Apple Store Fifth Ave', category: 'ELECTRONICS', amount: '-$1,299.00', status: '$5,400 / $6,000' },
                { date: 'OCT 11', name: 'Dividends: VTSAX', category: 'INVESTMENTS', amount: '+$842.15', status: '$12,000 / $15,000' },
                { date: 'OCT 10', name: 'Balthazar Restaurant', category: 'DINING', amount: '-$312.40', status: 'Dining' },
              ].map((item, i) => (
                <div key={i} className='group flex items-center justify-between py-4'>
                  <div className='flex items-center gap-8'>
                    <span className='text-[10px] font-bold text-muted-foreground w-12 tabular-nums'>{item.date}</span>
                    <div>
                      <p className='font-bold group-hover:underline cursor-pointer'>{item.name}</p>
                      <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>{item.category}</p>
                    </div>
                  </div>
                  <div className='text-right'>
                    <p className={cn('font-bold tabular-nums', item.amount.startsWith('+') ? 'text-emerald-500' : 'text-foreground')}>
                      {item.amount}
                    </p>
                    <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-widest'>{item.status}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant='outline' className='w-full h-14 border-2 font-bold uppercase tracking-widest'>
              View Full Statement
            </Button>
          </section>
        </div>

        {/* Right Column: Market Insights */}
        <div className='col-span-12 lg:col-span-4'>
          <Card className='bg-muted/30 p-8 border-none'>
            <div className='flex items-center gap-3 mb-10'>
              <Lightbulb className='size-5' />
              <h3 className='text-[10px] font-bold uppercase tracking-[0.3em]'>Market Insights</h3>
            </div>
            
            <div className='space-y-12'>
              <article className='space-y-4'>
                <div className='flex items-center gap-2 text-emerald-500'>
                  <TrendingUp className='size-4' />
                  <span className='text-[9px] font-bold uppercase tracking-widest'>The Soft Landing</span>
                </div>
                <h4 className='text-2xl font-bold tracking-tight font-serif'>Narrative Gains Momentum</h4>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Federal Reserve officials are increasingly optimistic about stabilizing inflation without triggering a recessionary downturn. High-net-worth portfolios are shifting toward...
                </p>
                <Button variant='link' className='px-0'>
                  Read More <ChevronRight className='size-3 ml-1' />
                </Button>
              </article>

              <Separator className='bg-muted-foreground/20' />

              <article className='space-y-4'>
                <div className='flex items-center gap-2 text-primary'>
                  <Building2 className='size-4' />
                  <span className='text-[9px] font-bold uppercase tracking-widest'>Real Estate</span>
                </div>
                <h4 className='text-2xl font-bold tracking-tight font-serif'>Investment Trends for Q4</h4>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Commercial property yields are stabilizing in tier-one markets as capital flows return to distressed assets.
                </p>
              </article>
              
              <Card className='bg-primary text-primary-foreground p-6 border-none'>
                <div className='flex justify-between items-start mb-6'>
                  <DollarSign className='size-6 opacity-50' />
                  <ArrowUpRight className='size-5 opacity-50' />
                </div>
                <h4 className='text-lg font-bold mb-2'>Tax Harvesting</h4>
                <p className='text-xs opacity-70 leading-relaxed font-medium'>Identify potential offsets for year-end filing before the November window.</p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
