'use client';

import { deleteCategory } from '@/actions/forms/category/delete';
import { type Category } from '@/lib/graphql/schema/operations';
import Format from '@/utils/Format';
import React from 'react';

type CategoryCardProps = {
	category: Pick<Category, 'id' | 'name' | 'amount'>;
};

export default function CategoryCard({ category }: CategoryCardProps) {
	const handleDelete = async () => {
		const result = await deleteCategory(category.id);

		if (result.error) {
			console.error(result.error);
		} else if (result.id) {
			console.log(`Deleted category of id: ${result.id}`);
		}
	};

	return (
		<div>
			{category.name} -- {Format.price(category.amount)}
			<button
				onClick={handleDelete}
				className='cursor-pointer py-1 px-3 text-xs rounded-md bg-gray-900 text-white'>
				delete
			</button>
		</div>
	);
}
