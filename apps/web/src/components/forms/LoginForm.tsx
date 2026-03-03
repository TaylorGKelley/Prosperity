'use client';

import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

import { login } from '@/actions/forms/login';
import loginFormSchema, { type LoginFormState } from '@/lib/zod/loginFormSchema';
import { Input } from '../ui/input';
import { cn } from '@/utils/tw';
import { Button } from '../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

type LoginFormProps = React.HTMLProps<HTMLFormElement>;

export default function LoginForm({ className, ...props }: LoginFormProps) {
	const router = useRouter();

	const handleSubmit = async (prevState: LoginFormState | null, formData: FormData) => {
		const result = await login(prevState, formData);

		if (result?.user) {
			router.push('/');
		}

		return result;
	};

	const [state, action] = useActionState(handleSubmit, null);

	const form = useForm({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<Form {...form}>
			<form action={action} className={cn('flex flex-col gap-6', className)} {...props}>
				<div className='flex flex-col items-center gap-2 text-center'>
					<h1 className='text-2xl font-bold'>Login to your account</h1>
					<p className='text-muted-foreground text-sm text-balance'>
						Enter your email below to login to your account
					</p>
				</div>
				<div className='grid gap-6'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage>{state?.errors?.[field.name]}</FormMessage>
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input {...field} type='password' />
								</FormControl>
								<FormMessage>{state?.errors?.[field.name]}</FormMessage>
							</FormItem>
						)}
					/>
					{state?.error && <p>{state.error}</p>}
					<Button type='submit' className='w-full'>
						Login
					</Button>
					<div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
						<span className='bg-background text-muted-foreground relative z-10 px-2'>
							Or continue with
						</span>
					</div>
					<Button
						variant='outline'
						type='button'
						className='w-full'
						onClick={() => router.push(process.env.NEXT_PUBLIC_AUTH_SERVICE_GOOGLE_OAUTH_URL!)}>
						<svg viewBox='-3 0 262 262' preserveAspectRatio='xMidYMid' className='size-4'>
							<g>
								<path
									d='M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451'
									fill='#4285F4'></path>
								<path
									d='M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1'
									fill='#34A853'></path>
								<path
									d='M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37'
									fill='#FBBC05'></path>
								<path
									d='M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479'
									fill='#EB4335'></path>
							</g>
						</svg>
						<span>Login with Google</span>
					</Button>
				</div>
				<div className='text-center text-sm'>
					Don&apos;t have an account?{' '}
					<Link href='/register' className='underline underline-offset-4'>
						Sign up
					</Link>
				</div>
			</form>
		</Form>
	);
}
