import React from 'react';
import CategoryIcon, { type CategoryColorKey, type CategoryIconKey } from './ui/category-icon';
import { ChevronsUpDownIcon } from 'lucide-react';

type CategoryDropdownProps = {
	defaultValue: {
		icon: CategoryIconKey;
		color: CategoryColorKey;
	};
};

export default function CategoryDropdown({ defaultValue }: CategoryDropdownProps) {
	return (
		<div className='flex items-stretch bg-gray-100 rounded-xl shadow'>
			<CategoryIcon icon={defaultValue.icon} color={defaultValue.color} className='shadow-none' />
			<div className='px-1 flex items-center'>
				<ChevronsUpDownIcon className='size-5' />
			</div>
		</div>
	);
}
