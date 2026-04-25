import React from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/features/shared/components/ui/card';
import { Button } from '@/features/shared/components/ui/button';
import { Input } from '@/features/shared/components/ui/input';
import { Badge } from '@/features/shared/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/features/shared/components/ui/table';
import { PageHeader } from '@/features/shared/components/layout/page-header';
import { cn } from '@/lib/utils/tw';

const transactions = [
  { id: 1, date: 'Oct 23, 2026', merchant: 'Equinox Hudson Yards', category: 'LIFESTYLE', account: 'Chase Sapphire', amount: -245.00, status: 'Completed' },
  { id: 2, date: 'Oct 22, 2026', merchant: 'Apple Store Fifth Ave', category: 'ELECTRONICS', account: 'Amex Gold', amount: -1299.00, status: 'Completed' },
  { id: 3, date: 'Oct 21, 2026', merchant: 'Vanguard Dividend Payment', category: 'INVESTMENTS', account: 'Vanguard Brokerage', amount: 842.15, status: 'Completed' },
  { id: 4, date: 'Oct 20, 2026', merchant: 'Balthazar Restaurant', category: 'DINING', account: 'Chase Sapphire', amount: -312.40, status: 'Pending' },
  { id: 5, date: 'Oct 19, 2026', merchant: 'Aman New York', category: 'TRAVEL', account: 'Amex Gold', amount: -4200.00, status: 'Completed' },
  { id: 6, date: 'Oct 18, 2026', merchant: 'Whole Foods Market', category: 'GROCERIES', account: 'Debit Card', amount: -185.20, status: 'Completed' },
  { id: 7, date: 'Oct 17, 2026', merchant: 'Netflix Subscription', category: 'ENTERTAINMENT', account: 'Amex Gold', amount: -19.99, status: 'Completed' },
  { id: 8, date: 'Oct 16, 2026', merchant: 'Condé Nast Publication', category: 'LIFESTYLE', account: 'Chase Sapphire', amount: -12.00, status: 'Completed' },
];

export default function TransactionsPage() {
  return (
    <div className='p-10 space-y-10 max-w-7xl mx-auto'>
      <PageHeader 
        title="Ledger History"
        description="Comprehensive record of all capital outflows and inflows."
      >
        <Button variant='outline' size='sm' className='h-10 px-4'>
          <Download className='size-3 mr-2' /> Export CSV
        </Button>
        <Button size='sm' className='h-10 px-4'>
          Add Entry
        </Button>
      </PageHeader>

      <div className='flex items-center gap-6'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
          <Input 
            placeholder='Search transactions, merchants, or accounts...' 
            className='pl-10 rounded-none border-x-0 border-t-0 border-b-2 border-muted shadow-none focus-visible:ring-0 h-12 bg-transparent text-lg' 
          />
        </div>
        <Button variant='outline' className='h-12 px-6 border-2'>
          <Filter className='size-4 mr-2' /> Filters
        </Button>
      </div>

      <Card className='border-none'>
        <Table>
          <TableHeader className='bg-muted/30'>
            <TableRow className='hover:bg-transparent border-b-2 border-foreground/10'>
              <TableHead className='h-14 px-6'>Date</TableHead>
              <TableHead className='h-14'>Merchant / Description</TableHead>
              <TableHead className='h-14'>Category</TableHead>
              <TableHead className='h-14'>Account</TableHead>
              <TableHead className='h-14 text-right'>Amount</TableHead>
              <TableHead className='h-14 text-center'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((t) => (
              <TableRow key={t.id} className='group border-b border-muted/50'>
                <TableCell className='px-6 py-4 font-medium text-muted-foreground tabular-nums'>{t.date}</TableCell>
                <TableCell className='py-4'>
                  <div className='flex items-center gap-3'>
                    {t.amount > 0 ? (
                      <ArrowUpRight className='size-3 text-emerald-500' />
                    ) : (
                      <ArrowDownLeft className='size-3 text-muted-foreground' />
                    )}
                    <span className='font-bold group-hover:underline cursor-pointer'>{t.merchant}</span>
                  </div>
                </TableCell>
                <TableCell className='py-4'>
                  <Badge variant='outline' className='rounded-none uppercase text-[9px] font-bold tracking-widest border-muted-foreground/30 px-2'>
                    {t.category}
                  </Badge>
                </TableCell>
                <TableCell className='py-4 text-xs text-muted-foreground font-medium'>{t.account}</TableCell>
                <TableCell className={cn(
                  'py-4 text-right font-bold tabular-nums text-base',
                  t.amount > 0 ? 'text-emerald-500' : 'text-foreground'
                )}>
                  {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </TableCell>
                <TableCell className='py-4 text-center'>
                  <div className={cn(
                    'size-2 rounded-full mx-auto',
                    t.status === 'Completed' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
                  )} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className='flex items-center justify-between border-t pt-8'>
        <p className='text-[10px] font-bold uppercase text-muted-foreground tracking-[0.2em]'>
          Showing 1 to 8 of 1,240 entries
        </p>
        <div className='flex gap-8'>
          <Button variant='link' className='px-0'>
            <ChevronLeft className='size-3 mr-2' /> Previous
          </Button>
          <Button variant='link' className='px-0'>
            Next <ChevronRight className='size-3 ml-2' />
          </Button>
        </div>
      </div>
    </div>
  );
}
