'use client';

import { deleteCategory } from '@/actions/category/delete';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { type Category } from '@/lib/graphql/schema/operations';
import { cn } from '@/lib/utils';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { EllipsisIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

type CategoryDropdownMenuProps = {
	category: { id: Category['id'] } & Partial<Category>;
	className?: string;
};

export default function CategoryDropdownMenu({ category, className }: CategoryDropdownMenuProps) {
	const router = useRouter();

	const handleDelete = async () => {
		const result = await deleteCategory(category.id);

		if (result.id) router.refresh();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='inline-flex justify-center items-center p-1 hover:bg-gray-100 transition-color rounded-sm'>
				<EllipsisIcon className={cn('size-5 text-gray-600', className)} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem
					className='text-red-500 hover:text-red-800 hover:bg-red-50 hover:[&>*]:text-red-800 transition-colors'
					onClick={handleDelete}>
					<TrashIcon className='size-4 text-red-500' />
					<span>Delete</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
