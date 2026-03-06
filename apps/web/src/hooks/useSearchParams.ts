'use client';

import { usePathname, useRouter, useSearchParams as useSearchParamsNext } from 'next/navigation';

export default function useSearchParams() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParamsNext();

	return {
		getAll: (key: string) => searchParams.getAll(key),
		get: (key: string) => searchParams.get(key),
		set: (key: string, value: string) => {
			const params = new URLSearchParams(searchParams);

			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}

			router.replace(`${pathname}?${params.toString()}`);
		},
		delete: (key: string) => {
			const params = new URLSearchParams(searchParams);

			params.delete(key);

			router.replace(`${pathname}?${params.toString()}`);
		},
	};
}
