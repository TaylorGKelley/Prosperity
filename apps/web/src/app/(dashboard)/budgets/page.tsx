import React from 'react';
import { 
  TrendingUp, 
  AlertCircle, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { Card } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Separator } from '@/features/shared/components/ui/separator';
import { PageHeader } from '@/features/shared/components/layout/page-header';

const budgets = [
  { category: 'LIFESTYLE & LEISURE', spent: 2880, limit: 4000, color: 'bg-primary' },
  { category: 'ESSENTIALS & HOUSING', spent: 5400, limit: 6000, color: 'bg-primary' },
  { category: 'INVESTMENTS', spent: 12000, limit: 15000, color: 'bg-emerald-500' },
  { category: 'TRAVEL', spent: 4200, limit: 3500, color: 'bg-destructive' },
  { category: 'DINING', spent: 850, limit: 1200, color: 'bg-primary' },
];

export default function BudgetsPage() {
  return (
    <div className='p-10 space-y-10 max-w-7xl mx-auto'>
      <PageHeader 
        title="Capital Allocation"
        description="Monitoring expenditure against established fiscal targets."
        metricLabel="Total Monthly Target"
        metricValue="$29,700.00"
      />

      <div className='grid grid-cols-12 gap-10'>
        <div className='col-span-12 lg:col-span-8 space-y-10'>
          <section className='grid gap-10'>
            {budgets.map((b) => (
              <div key={b.category} className='group space-y-4'>
                <div className='flex items-end justify-between'>
                  <div className='space-y-1'>
                    <h3 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>{b.category}</h3>
                    <p className='text-3xl font-medium font-serif tabular-nums'>
                      ${b.spent.toLocaleString()} <span className='text-muted-foreground font-sans text-sm font-medium tracking-normal'>/ ${b.limit.toLocaleString()}</span>
                    </p>
                  </div>
                  <div className='text-right space-y-1'>
                    <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>Remaining</p>
                    <p className={`text-lg font-medium font-serif tabular-nums ${b.spent > b.limit ? 'text-destructive' : 'text-foreground'}`}>
                      ${(b.limit - b.spent).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className='h-2 w-full bg-muted overflow-hidden'>
                  <div 
                    className={`h-full transition-all duration-500 ${b.color}`} 
                    style={{ width: `${Math.min((b.spent / b.limit) * 100, 100)}%` }} 
                  />
                </div>

                {b.spent > b.limit && (
                  <div className='flex items-center gap-2 text-destructive bg-destructive/10 w-fit px-3 py-1'>
                    <AlertCircle className='size-3' />
                    <span className='text-[9px] font-bold uppercase tracking-widest'>Critical: Exceeding Allocation Target</span>
                  </div>
                )}
              </div>
            ))}
          </section>

          <Button variant='outline' className='w-full h-16 border-2 font-bold uppercase tracking-[0.2em] text-xs'>
            <Plus className='size-4 mr-3' /> Create New Allocation Target
          </Button>
        </div>

        <div className='col-span-12 lg:col-span-4'>
          <Card className='bg-muted/30 p-8 border-none sticky top-24'>
            <h3 className='text-[10px] font-bold uppercase tracking-[0.3em] mb-10'>Fiscal Insights</h3>
            
            <div className='space-y-10'>
              <div className='space-y-3'>
                <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground'>Current Burn Rate</p>
                <p className='text-3xl font-medium font-serif tabular-nums'>$1,042 / day</p>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  Projected to finish the fiscal period <span className='text-foreground font-bold'>4% under</span> established budget.
                </p>
              </div>

              <Separator className='bg-muted-foreground/20' />

              <div className='space-y-4'>
                <div className='flex items-center gap-2 text-emerald-500'>
                  <TrendingUp className='size-4' />
                  <span className='text-[9px] font-bold uppercase tracking-widest'>Optimization</span>
                </div>
                <h4 className='text-xl font-medium leading-snug font-serif'>Reduce Lifestyle flow by 12% to accelerate Portfolio growth.</h4>
                <Button variant='link' className='px-0'>
                  View Projection <ArrowRight className='size-3 ml-2' />
                </Button>
              </div>

              <Card className='bg-background p-8 border-l-4 border-primary border-y-0 border-r-0'>
                <h4 className='text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2'>Year-to-Date Saving</h4>
                <p className='text-3xl font-medium font-serif tabular-nums'>$42,840.12</p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
