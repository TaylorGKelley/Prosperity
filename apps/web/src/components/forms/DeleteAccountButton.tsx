'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { LoaderPinwheel, Trash } from 'lucide-react';
import { type UUID } from 'node:crypto';
import deleteAccount from '@/actions/account/delete';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

type DeleteAccountButtonProps = {
	id: UUID;
};

export default function DeleteAccountButton({ id }: DeleteAccountButtonProps) {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();

		setIsPending(true);

		const result = await deleteAccount(id);

		if (!result.success) {
			toast.error(result.error || 'An unknown error occurred');
		} else {
			toast.success('Account deleted');
			router.refresh();
		}

		setIsPending(false);
	};

	return (
		<Button
			variant='outline'
			size='icon'
			className='text-red-500 dark:hover:text-white hover:text-white hover:bg-red-500/70'
			onClick={handleClick}>
			{!isPending ? (
				<Trash className='size-4' />
			) : (
				<LoaderPinwheel className='size-4 animate-spin' />
			)}
		</Button>
	);
}
