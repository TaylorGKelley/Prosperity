import CategoryCard from '@/components/CategoryCard';
import CreateBudgetForm from '@/components/forms/CreateBudgetForm';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { createGraphClient } from '@/lib/graphql';
import { GET_ALL_CATEGORIES } from '@/lib/graphql/queries/categories';
import {
	type GetAllCategoriesQuery,
	type GetAllCategoriesQueryVariables,
} from '@/lib/graphql/schema/operations';
import Link from 'next/link';
import React from 'react';

export default async function Budget() {
	const client = await createGraphClient();
	const { data } = await client.query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>({
		query: GET_ALL_CATEGORIES,
		variables: {
			monthDate: new Date(),
		},
	});

	if (!data.budget?.id) {
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
						<CreateBudgetForm />
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<header className='flex h-16 shrink-0 items-center gap-2 border-b px-4'>
				<SidebarTrigger className='-ml-1' />
				<Separator orientation='vertical' className='mr-2 data-[orientation=vertical]:h-4' />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Budget</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<div className='flex flex-1 flex-col gap-4 p-4'>
				<section>
					<Link href='/budget/add-category' className='underline mb-2'>
						Add a category
					</Link>
					<h3 className='text-2xl'>Categories</h3>
					{data.categories.map((category) => (
						<CategoryCard key={category.id} category={category} />
					))}
				</section>
			</div>
		</>
	);
}
