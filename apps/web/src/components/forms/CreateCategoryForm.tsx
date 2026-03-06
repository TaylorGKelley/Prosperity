'use client';

import { createCategory } from '@/actions/forms/category/create';
import createCategoryFormSchema, {
	type CreateCategoryFormState,
} from '@/lib/zod/createCategoryFormSchema';
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { LoaderCircleIcon, PlusIcon } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';
import PriceInput from '../ui/price-input';
import { ColorEnum, IconEnum } from '@/lib/graphql/schema/operations';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import CategoryIcon, { type CategoryColorKey, type CategoryIconKey } from '../ui/category-icon';

type CreateCategoryFormProps = React.HTMLProps<HTMLFormElement>;

export default function CreateCategoryForm({ className, ...props }: CreateCategoryFormProps) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const router = useRouter();

	const handleSubmit = async (prevState: CreateCategoryFormState | null, formData: FormData) => {
		const result = await createCategory(prevState, formData);

		if (result?.category) {
			router.refresh();
			setDialogOpen(false);
			form.reset();
		}

		return result;
	};

	const [state, action, isPending] = useActionState(handleSubmit, null);

	const form = useForm({
		resolver: zodResolver(createCategoryFormSchema),
		defaultValues: {
			name: '',
			amount: 0.0,
			color: ColorEnum.Blue,
			icon: IconEnum.AlarmClock,
		},
	});
	const [currentIcon, setCurrentIcon] = useState({
		color: form.formState.defaultValues?.color || ColorEnum.Blue,
		icon: form.formState.defaultValues?.icon || IconEnum.AlarmClock,
	});

	return (
		<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
			<DialogTrigger asChild>
				<Button
					variant='outline'
					className='flex gap-2 items-center justify-center px-4 py-3 w-full rounded-xl border bg-gray-100 hover:bg-gray-300/10 transition-colors cursor-pointer'>
					<PlusIcon className='size-5' />
					<p className='font-normal'>Add Category</p>
				</Button>
			</DialogTrigger>
			<DialogContent className='' showCloseButton={false}>
				<DialogHeader>
					<DialogTitle>Create a Category</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form {...props} action={action}>
						<div className={cn('flex gap-2 flex-col', className)}>
							<div className='flex gap-4 self-center'>
								<CategoryIcon
									color={currentIcon.color.toLowerCase().replace('_', '-') as CategoryColorKey}
									icon={currentIcon.icon.toLowerCase().replace('_', '-') as CategoryIconKey}
									className='size-14'
								/>
								<FormField
									control={form.control}
									name='color'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Color</FormLabel>
											<Select
												onValueChange={(value) => {
													console.log(value);
													setCurrentIcon((prev) => ({
														...prev,
														color:
															ColorEnum[
																`${value[0]}${value
																	.toLowerCase()
																	.substring(1)}` as keyof typeof ColorEnum
															],
													}));
													field.onChange(value);
												}}
												defaultValue={field.value}
												{...field}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.entries(ColorEnum).map(([key, value]) => (
														<SelectItem key={key} value={value}>
															{key}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage>{state?.errors?.[field.name]}</FormMessage>
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='icon'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Icon</FormLabel>
											<Select
												onValueChange={(value) => {
													setCurrentIcon((prev) => ({
														...prev,
														icon: IconEnum[
															`${value[0]}${value
																.toLowerCase()
																.substring(1)}` as keyof typeof IconEnum
														],
													}));
													field.onChange(value);
												}}
												defaultValue={field.value}
												{...field}>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder='Select' />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													{Object.entries(IconEnum).map(([key, value]) => (
														<SelectItem key={key} value={value}>
															{key}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
											<FormMessage>{state?.errors?.[field.name]}</FormMessage>
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input {...field} type='text' required />
										</FormControl>
										<FormMessage>{state?.errors?.[field.name]}</FormMessage>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='amount'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Amount</FormLabel>
										<FormControl>
											<PriceInput {...field} min='0.00' max='999999.99' required />
										</FormControl>
										<FormMessage>{state?.errors?.[field.name]}</FormMessage>
									</FormItem>
								)}
							/>

							<p>{state?.error}</p>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant='outline'>Cancel</Button>
							</DialogClose>
							<Button type='submit' disabled={isPending}>
								{!isPending ? (
									'Create'
								) : (
									<>
										<LoaderCircleIcon className='animate-spin' />
										<span>Creating</span>
									</>
								)}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
