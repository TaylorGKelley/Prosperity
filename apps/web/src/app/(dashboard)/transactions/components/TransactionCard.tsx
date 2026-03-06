import CategoryIcon, {
	type CategoryColorKey,
	type CategoryIconKey,
} from '@/components/ui/category-icon';
import { type Transaction } from '@/lib/graphql/schema/operations';
import Format from '@/utils/Format';
import { MoreHorizontalIcon } from 'lucide-react';
import React from 'react';

type TransactionCardProps = {
	transaction: Transaction;
};

export default function TransactionCard({ transaction }: TransactionCardProps) {
	return (
		<div
			key={transaction.id}
			className='bg-white rounded-2xl shadow flex items-center justify-between px-8 py-6 w-full'>
			<div className='flex gap-4 items-center'>
				<CategoryIcon
					icon={transaction.category?.icon.toLowerCase().replace('_', '-') as CategoryIconKey}
					color={transaction.category?.color.toLowerCase().replace('_', '-') as CategoryColorKey}
				/>
				<div className='flex flex-col justify-center'>
					<p className='font-semibold text-xl'>{transaction.description}</p>
					<p className='font-normal text-gray-500'>{Format.date(transaction.date).dateOnly}</p>
				</div>
			</div>
			<div className='flex gap-8 items-center'>
				<p className='font-semibold text-xl text-right'>{Format.price(transaction.amount)}</p>
				<MoreHorizontalIcon className='size-6' />
			</div>
		</div>
	);
}
