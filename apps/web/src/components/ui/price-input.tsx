import { cn } from '@/lib/utils';
import React from 'react';
import { FormLabel } from './form';

type PriceInputProps = React.HTMLProps<HTMLInputElement>;

export default function PriceInput({
	className,
	disabled,
	placeholder,
	...props
}: PriceInputProps) {
	return (
		<div>
			<div
				className={cn(
					'h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] md:text-sm inline-flex gap-1 border-input data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:pointer-events-none',
					'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
					'data-[invalid="true"]:ring-destructive/20 dark:data-[invalid="true"]:ring-destructive/40 data-[invalid="true"]:border-destructive',
				)}
				data-disabled={disabled}
				data-invalid={props['aria-invalid']}>
				<FormLabel>$</FormLabel>
				<input
					type='number'
					step='0.01'
					placeholder={placeholder || '0.00'}
					data-slot='input'
					className={cn(
						'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 grow',
						'focus-visible:outline-none',
						className,
					)}
					disabled={disabled}
					{...props}
				/>
			</div>
		</div>
	);
}
