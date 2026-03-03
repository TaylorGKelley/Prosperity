'use client';

import logout from '@/actions/forms/logout';
import { useRouter } from 'next/navigation';
import React, { useActionState } from 'react';

export default function LogoutForm() {
	const router = useRouter();

	const handleSubmit = async () => {
		const result = await logout();

		if (!result?.error) {
			router.push('/');
		}

		return result;
	};

	const [state, action, isPending] = useActionState(handleSubmit, null);

	return (
		<form action={action}>
			<button type='submit'>{!isPending ? 'Logout' : 'Logging out...'}</button>
			<p className='text-red-500'>{state?.error}</p>
		</form>
	);
}
