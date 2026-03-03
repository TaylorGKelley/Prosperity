import { type GetTransactionsWithPaginationQuery } from '@/lib/graphql/schema/operations';
import Format from '@/utils/Format';
import { StoreIcon } from 'lucide-react';
import React from 'react';

type TransactionCardProps = {
	transaction: GetTransactionsWithPaginationQuery['transactions']['items'][number];
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
	return (
		<div className='flex items-center gap-2 p-2 bg-white text-black dark:bg-gray-950 dark:text-white rounded-3xl shadow-md'>
			<div className='bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl'>
				<StoreIcon height={32} width={32} color={'#81B2CA'} />
			</div>
			<div className='flex-auto'>
				<h5 className='font-semibold'>{transaction.description}</h5>
				<p className='text-xs'>{Format.date(transaction.date).dateOnly}</p>
			</div>
			<div className='text-right pr-2'>
				<p className='font-semibold'>${transaction.amount}</p>
				<p className='text-xs opacity-50'>{transaction.type}</p>
			</div>
		</div>
	);
}
