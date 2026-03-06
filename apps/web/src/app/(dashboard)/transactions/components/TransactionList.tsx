'use client';

import useIsVisible from '@/hooks/useIsVisible';
import { type TransactionPageQuery } from '@/lib/graphql/schema/operations';
import React, { use } from 'react';

type TransactionListProps = {
	transactionsQuery: Promise<TransactionPageQuery['transactions']>;
};

export default function TransactionList({ transactionsQuery }: TransactionListProps) {
	const transactions = use(transactionsQuery);
	const { isVisible, visibleElRef } = useIsVisible<HTMLDivElement>();

	return <div ref={visibleElRef}>{JSON.stringify(transactions)}</div>;
}
