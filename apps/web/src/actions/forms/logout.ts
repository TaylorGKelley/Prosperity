'use server';

import { type LogoutFormState } from '@/lib/zod/logoutFormSchema';
import { fetchWithAuth } from 'authentication-service-nextjs-sdk/server';
import { cookies } from 'next/headers';

export default async function logout(): Promise<LogoutFormState> {
	try {
		const cookieStore = await cookies();

		await fetchWithAuth<unknown>(`${process.env.AUTH_SERVICE_HOST_URL}/api/v1/logout`, {
			method: 'DELETE',
			headers: [['cookie', 'refreshToken=' + cookieStore.get('refreshToken')?.value + ';']],
		});

		cookieStore.delete('accessToken');
		cookieStore.delete('refreshToken');

		return {};
	} catch (error) {
		return {
			error: (error as Error).message,
		};
	}
}
