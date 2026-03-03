'use server';

import { type User } from 'authentication-service-nextjs-sdk/server';
import axios from 'axios';
import { cookies } from 'next/headers';

import loginFormSchema, {
	type LoginFormState,
} from '@/lib/zod/loginFormSchema';
import parseCookie from '@/utils/parseCookie';

export async function login(
	_prevState: LoginFormState | null,
	formData: FormData
): Promise<LoginFormState> {
	try {
		// Validate input
		const result = loginFormSchema.safeParse(Object.fromEntries(formData));

		if (!result.success) {
			return {
				user: null,
				errors: result.error.flatten().fieldErrors,
			};
		}

		const { email, password } = result.data;

		const response = await axios.post<{
			accessToken: string;
			user: User;
		}>(`${process.env.AUTH_SERVICE_HOST_URL}/api/v1/login`, {
			username: email,
			password,
		});

		const cookieStore = await cookies();

		const accessToken = response.data.accessToken;
		const refreshCookie = parseCookie(
			'refreshToken',
			response.headers['set-cookie']
		);

		cookieStore.set('accessToken', accessToken, {
			expires: Date.now() + 15 * 60 * 1000, // 15 minutes
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
		});
		cookieStore.set('refreshToken', refreshCookie.Value, {
			httpOnly: refreshCookie.HttpOnly || true,
			expires: refreshCookie.Expires,
			path: refreshCookie.Path ?? '/',
			sameSite: refreshCookie.SameSite || 'lax',
		});

		return {
			user: response.data.user,
		};
	} catch (error) {
		return {
			user: null,
			error: (error as Error).message,
		};
	}
}
