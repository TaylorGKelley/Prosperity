import { cn } from '@/utils/tw';
import React, { type SelectHTMLAttributes } from 'react';

type SelectProps = {
	id: string;
	name: string;
	label: string;
	required?: boolean;
	errors?: string[];
	placeholder?: string;
	options: SelectOption[];
	className?: string;
};

export type SelectOption = {
	id: number | string;
	name: string;
};

export default function Select({
	id,
	name,
	label,
	required,
	errors,
	placeholder,
	options,
	className,
	...attributes
}: SelectProps &
	Omit<
		SelectHTMLAttributes<HTMLSelectElement>,
		'aria-invalid' | 'aria-describedby' | 'autoComplete'
	>) {
	const hasError = errors && errors.length > 0;
	const errorId = `${id}-error`;

	return (
		<div className='relative w-full max-w-sm'>
			<label htmlFor={id} className='block text-sm font-medium mb-1'>
				{label}
				{!required && <span aria-label='optional'>(optional)</span>}
			</label>
			<select
				id={id}
				name={name}
				required={required}
				aria-invalid={hasError}
				aria-describedby={hasError ? errorId : undefined}
				autoComplete={name}
				className={cn('w-full px-3 py-2 border rounded-md', className, {
					'border-red-500': hasError,
					'border-gray-300': !hasError,
				})}
				{...attributes}>
				{placeholder && <option value={undefined}>{placeholder}</option>}
				{options.map((option) => (
					<option key={option.id} value={option.id}>
						{option.name}
					</option>
				))}
			</select>
			{hasError && (
				<p id={errorId} role='alert' className='mt-1 text-sm text-red-600'>
					{errors.join(', ')}
				</p>
			)}
		</div>
	);
}
