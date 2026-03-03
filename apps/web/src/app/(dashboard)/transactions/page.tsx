import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbPage,
	BreadcrumbSeparator,
	BreadcrumbLink,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import React from 'react';
import Format from '@/utils/Format';
import TransactionList from './transaction-list';
import getAllTransactions from '@/actions/transaction/getAll';
import { createGraphClient } from '@/lib/graphql';
import { GET_ALL_CATEGORIES } from '@/lib/graphql/queries/categories';
import {
	type GetAllCategoriesQuery,
	type GetAllCategoriesQueryVariables,
} from '@/lib/graphql/schema/operations';
import BarChart from '@/components/BarChart';
import RefreshTransactionsButton from '@/components/forms/RefreshTransactionsButton';

type TransactionsPageProps = {
	searchParams: Promise<{ monthDate?: Date }>;
};

export default async function Transactions({ searchParams }: TransactionsPageProps) {
	const { monthDate } = await searchParams;

	const transactionQuery = getAllTransactions({ monthDate: monthDate, count: 20 });

	const graphClient = await createGraphClient();
	const {
		data: { categories },
	} = await graphClient.query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
		query: GET_ALL_CATEGORIES,
		variables: {
			monthDate: monthDate || new Date(),
		},
	});

	return (
		<>
			<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
				<SidebarTrigger className='-ml-1' />
				<Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>
							<BreadcrumbLink href='/'>Home</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block' />
						<BreadcrumbItem>
							<BreadcrumbPage>All Transactions</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<main className='grid lg:grid-cols-4 max-lg:grid-cols-1 bg-gray-500/10'>
				<div className=' grid gap-6 py-8 lg:col-span-3'>
					<section className='px-4 sm:px-12 flex justify-between items-center'>
						<h3 className='text-2xl font-bold'>{Format.date(monthDate || new Date()).dateMonth}</h3>
						<RefreshTransactionsButton />
					</section>
					<section className='px-4 sm:px-12'>
						<TransactionList
							initialTransactionQuery={transactionQuery}
							key={monthDate?.toString()} // Re-render when transactionQuery refreshes because of monthDate search param
						/>
					</section>
				</div>
				<aside className='lg:border-l lg:col-span-1 lg:p-8 p-4 max-lg:border-t flex flex-col gap-6'>
					<h4 className='text-lg font-semibold'>Summary</h4>
					<div>
						<BarChart
							data={categories.map((category) => ({
								name: category.name,
								totalSpent: Math.abs(category.totalSpent!),
							}))}
							YDataKey={'totalSpent'}
							XDataKey={'name'}
							config={{
								totalSpent: {
									label: 'Spent by categories',
									color: 'var(--chart-1)',
								},
							}}
						/>
					</div>
					<div>
						<h4 className='mb-2'>Remaining funds</h4>
						<ul className='grid gap-4'>
							{categories.map((category) => (
								<li
									key={category.id}
									className='px-4 py-2 rounded-md bg-gray-500/10 flex justify-between items-center'>
									<p>{category.name}</p>
									<div>
										<h5 className='font-medium'>
											{Format.price(
												category.amount - (category.totalSpent ? Math.abs(category.totalSpent) : 0),
											)}
										</h5>
										<p className='text-xs text-right opacity-90'>{Format.price(category.amount)}</p>
									</div>
								</li>
							))}
						</ul>
					</div>
				</aside>
			</main>
		</>
	);
}
