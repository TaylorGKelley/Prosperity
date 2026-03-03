'use client';

import deleteTransaction from '@/actions/transaction/delete';
import getAllTransactions, { type GetAllTransactionsResult } from '@/actions/transaction/getAll';
import { Button } from '@/components/ui/button';
import {
	type Transaction,
	type PageInformation,
	TransactionStatusEnum,
} from '@/lib/graphql/schema/operations';
import Cursor from '@/lib/graphql/utils/Cursor';
import Format from '@/utils/Format';
import { CircleDashed, LoaderCircle, Trash } from 'lucide-react';
import { type UUID } from 'node:crypto';
import React, { use, useState } from 'react';
import { toast } from 'sonner';

type TransactionListProps = {
	initialTransactionQuery: Promise<GetAllTransactionsResult>;
};

export default function TransactionList({ initialTransactionQuery }: TransactionListProps) {
	const data = use(initialTransactionQuery);

	const [isPending, setIsPending] = useState<boolean>(false);
	const [nextCursor, setNextCursor] = useState<PageInformation | null>(
		data.success ? data.pageInfo || null : null,
	);
	const [transactions, setTransactions] = useState(data.success ? data.items : []);

	const handleClick = async () => {
		if (nextCursor?.hasNextPage) {
			setIsPending(true);

			const result = await getAllTransactions({
				count: 20,
				cursor: Cursor.decode(nextCursor.endCursor!),
			});

			if (result.success) {
				setTransactions((prev: Transaction[]) => [...prev, ...result.items]);
				setNextCursor(result.pageInfo || null);
			}

			setIsPending(false);
		}
	};

	const handleDelete = async (id: UUID, e: React.MouseEvent<HTMLButtonElement>) => {
		try {
			e.preventDefault();
			e.stopPropagation();

			setTransactions((prev) => prev.filter((transaction) => transaction.id !== id));
			await deleteTransaction(id);

			toast.success('Transaction deleted');
		} catch (error) {
			toast.error((error as Error).message);
		}
	};

	return (
		<ul className='grid gap-6 pb-8'>
			{transactions.map((transaction) => (
				<li
					key={transaction.id}
					className='bg-white dark:bg-gray-950 shadow-sm py-6 sm:px-8 px-4 rounded-xl flex gap-4 items-center'>
					<div className='rounded-md bg-blue-100 size-10'>{transaction.categoryId}</div>
					<div className='grid'>
						<h5>{transaction.description}</h5>
						<p className='opacity-75 text-sm'>{Format.date(transaction.date).dateOnly}</p>
					</div>
					{transaction.status === TransactionStatusEnum.Pending && (
						<p className='flex gap-2 items-center opacity-75 py-2 px-3 bg-gray-500/20 rounded-full'>
							<CircleDashed className='size-4' />
							<span>{transaction.status}</span>
						</p>
					)}
					<p className='font-bold text-lg text-right flex-grow'>{transaction.amount}</p>
					{transaction.status === TransactionStatusEnum.Posted ? (
						<Button
							variant='outline'
							size='icon'
							className='text-red-400 hover:bg-red-500/20 dark:hover:bg-red-500/20 hover:text-white'
							onClick={(e) => handleDelete(transaction.id, e)}>
							<Trash className='size-4' />
						</Button>
					) : undefined}
				</li>
			))}
			{nextCursor?.hasNextPage && (
				<li className='flex justify-center'>
					<Button variant='default' onClick={handleClick}>
						{isPending && <LoaderCircle className='size-4 animate-spin' />}
						<span>Load More</span>
					</Button>
				</li>
			)}
		</ul>
	);
}
