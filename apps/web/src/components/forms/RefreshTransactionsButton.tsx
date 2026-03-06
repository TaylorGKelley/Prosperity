'use client';

import React, { startTransition, useActionState } from 'react';
import { Button } from '../ui/button';
import { LoaderCircle, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import syncTransactions from '@/actions/transaction/sync';
import { type SyncTransactions } from '@/lib/graphql/schema/operations';

export default function RefreshTransactionsButton() {
	const router = useRouter();
	const [state, action, isPending] = useActionState<SyncTransactions | null | undefined>(
		syncTransactions,
		undefined,
	);

	const handleClick = () => {
		startTransition(action);

		if (!state?.error) {
			router.refresh();
		}
	};

	return (
		<>
			<Button variant='outline' onClick={handleClick}>
				{!isPending ? (
					<RefreshCw className='size-4' />
				) : (
					<LoaderCircle className='size-4 animate-spin' />
				)}
				<span>Refresh</span>
			</Button>
			{state?.error && <p>{state.error}</p>}
		</>
	);
}
