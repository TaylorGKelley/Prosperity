'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { TellerConnect, type TellerConnectOnSuccess } from 'teller-connect-react';

export default function LinkAccountForm() {
	const router = useRouter();

	const handleSuccess: TellerConnectOnSuccess = async (authorization) => {
		try {
			const res = await fetch('/api/teller-success', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(authorization),
			});

			if (res.status === 500) {
				throw new Error((await res.json()).error);
			} else if (res.status === 200) {
				toast.success('Account linked successfully!');
				router.refresh();
			}
		} catch (error) {
			if (typeof error === 'string')
				toast.error(error, {
					duration: 5000,
				});
			else
				toast.error((error as Error).message, {
					duration: 5000,
				});
		}
	};

	return (
		<div>
			<TellerConnect
				applicationId={process.env.NEXT_PUBLIC_TELLER_APPLICATION_ID!}
				environment={
					process.env.NEXT_PUBLIC_TELLER_ENVIRONMENT! as 'sandbox' | 'development' | 'production'
				}
				products={['transactions', 'balance']}
				onSuccess={handleSuccess}
				style={{
					color: 'black',
				}}>
				Connect to bank
			</TellerConnect>
		</div>
	);
}
