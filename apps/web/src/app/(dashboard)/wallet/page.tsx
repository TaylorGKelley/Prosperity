import DeleteAccountButton from '@/components/forms/DeleteAccountButton';
import LinkAccountForm from '@/components/forms/LinkAccountForm';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { createGraphClient } from '@/lib/graphql';
import { GET_ALL_ACCOUNTS } from '@/lib/graphql/queries/accounts';
import {
	type GetAllAccountsQuery,
	type GetAllAccountsQueryVariables,
} from '@/lib/graphql/schema/operations';
import React from 'react';

export default async function Wallet() {
	const graphClient = await createGraphClient();
	const { data } = await graphClient.query<GetAllAccountsQuery, GetAllAccountsQueryVariables>({
		query: GET_ALL_ACCOUNTS,
	});

	return (
		<>
			<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
				<SidebarTrigger className='-ml-1' />
				<Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Wallet</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<div className='flex gap-6 items-center'>
					<h2>Wallet</h2>
					<LinkAccountForm />
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead></TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Last Four</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.accounts.map((account) => (
							<TableRow key={account.id}>
								<TableCell>
									<DeleteAccountButton id={account.id} />
								</TableCell>
								<TableCell>{account.name}</TableCell>
								<TableCell>{account.type}</TableCell>
								<TableCell>{account.lastFour}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}
