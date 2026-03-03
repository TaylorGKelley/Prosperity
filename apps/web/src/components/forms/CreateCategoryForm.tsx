'use client';

import { createCategory } from '@/actions/forms/category/create';
import { type CreateCategoryFormState } from '@/lib/zod/createCategoryFormSchema';
import { useRouter } from 'next/navigation';
import { use, useActionState } from 'react';
import Input from '../inputs/Input';
import SubmitButton from '../inputs/SubmitButton';

type CreateCategoryFormProps = {
	defaultStateQuery?: Promise<NonNullable<CreateCategoryFormState>['values']>;
};

export default function CreateCategoryForm({ defaultStateQuery }: CreateCategoryFormProps) {
	const defaultState = use(defaultStateQuery || Promise.resolve(null));
	const router = useRouter();

	const handleSubmit = async (prevState: CreateCategoryFormState | null, formData: FormData) => {
		const result = await createCategory(prevState, formData);

		if (result?.category) {
			router.push('/budget');
		}

		return result;
	};

	const [state, action] = useActionState(handleSubmit, defaultState && { values: defaultState });

	return (
		<form action={action} className='flex gap-2 flex-col'>
			<Input
				label='Name'
				id='name'
				name='name'
				type='text'
				required
				defaultValue={state?.values.name}
				errors={state?.errors?.name}
			/>

			<Input
				label='Amount'
				id='amount'
				name='amount'
				type='number'
				required
				min='0.00'
				max='999999.00'
				step='0.01'
				defaultValue={state?.values.amount}
				errors={state?.errors?.amount}
			/>

			<p>{state?.error}</p>

			<SubmitButton>Create</SubmitButton>
		</form>
	);
}
