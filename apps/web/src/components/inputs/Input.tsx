import { cn } from '@/utils/tw';
import React, { type InputHTMLAttributes } from 'react';

type InputProps = {
	id: string;
	name: string;
	type: string;
	label: string;
	required?: boolean;
	errors?: string[];
	placeholder?: string;
	className?: string;
};

export default function Input({
	id,
	name,
	type,
	label,
	required,
	errors,
	placeholder,
	className,
	...attributes
}: InputProps &
	Omit<
		InputHTMLAttributes<HTMLInputElement>,
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
			<input
				id={id}
				name={name}
				type={type}
				required={required}
				placeholder={placeholder}
				aria-invalid={hasError}
				aria-describedby={hasError ? errorId : undefined}
				autoComplete={name}
				className={cn('w-full px-3 py-2 border rounded-md', className, {
					'border-red-500': hasError,
					'border-gray-300': !hasError,
				})}
				{...attributes}
			/>
			{hasError && (
				<p id={errorId} role='alert' className='mt-1 text-sm text-red-600'>
					{errors.join(', ')}
				</p>
			)}
		</div>
	);
}
