'use client';

import React, { startTransition, useActionState } from 'react';
import { Button } from '../ui/button';
import createBudget from '@/actions/forms/budget/create';
import { useRouter } from 'next/navigation';

export default function CreateBudgetForm() {
	const router = useRouter();
	const [state, action] = useActionState<{ error?: string }>(createBudget, {});

	const handleClick = async () => {
		startTransition(action);

		if (!state.error) {
			router.refresh();
		}
	};

	return (
		<>
			<Button variant='default' type='button' onClick={handleClick}>
				Create your budget!
			</Button>
			{state?.error && <p>{state.error}</p>}
		</>
	);
}
