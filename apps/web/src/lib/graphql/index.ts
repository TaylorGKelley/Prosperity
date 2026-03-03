import 'server-only';

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getToken, isExpiredToken, refreshTokens } from 'authentication-service-nextjs-sdk/server';

const httpLink = createHttpLink({
	uri: process.env.BACKEND_API_BASE_URL,
});

export const createGraphClient = async (config?: { isInServerAction?: boolean }) => {
	const authLink = setContext(async (_, { headers }) => {
		let accessToken = await getToken('accessToken');

		if (config?.isInServerAction && (!accessToken || isExpiredToken(accessToken))) {
			({ accessToken } = await refreshTokens());
		}

		return {
			headers: {
				...headers,
				authorization: accessToken ? `Bearer ${accessToken}` : '',
			},
		};
	});

	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache(),
	});
};
