'use client';

import { cn } from '@/utils/tw';
import { CalendarIcon, HouseIcon, UserIcon, WalletIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const links = [
	{
		id: 0,
		title: 'Home',
		Icon: HouseIcon,
		url: '/',
	},
	{
		id: 1,
		title: 'Budget',
		Icon: CalendarIcon,
		url: '/budget',
	},
	{
		id: 2,
		title: 'Wallet',
		Icon: WalletIcon,
		url: '/wallet',
	},
	{
		id: 3,
		title: 'Profile',
		Icon: UserIcon,
		url: '/profile',
	},
] as const;

function NavBar() {
	const pathname = usePathname();

	return (
		<header className='flex justify-between items-center bg-white text-black border-b-gray-100 dark:bg-gray-950 dark:text-white dark:border-b-gray-700 py-4 px-6 sm:px-6 md:px-8'>
			<Link href='/'>
				<h1 className='text-2xl font-semibold'>Prosperity</h1>
			</Link>
			<nav className='max-sm:fixed max-sm:bottom-0 max-sm:inset-x-0 max-sm:bg-white max-sm:shadow-lg max-sm:p-6 relative'>
				<div className='absolute h-full w-'>{/* Animated link background */}</div>
				<ul className='flex max-sm:justify-evenly sm:gap-8'>
					{links.map((link) => (
						<li key={link.id}>
							<Link
								className={cn('flex items-center gap-2', {
									underline: pathname == link.url,
									'opacity-50': pathname !== link.url,
								})}
								href={link.url}
								aria-label={link.title}
								title={`${link.title} Page`}>
								<span className='max-sm:inline hidden'>
									<link.Icon className='w-5 h-5' />
								</span>
								<span className='max-sm:hidden inline'>{link.title}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}

export default NavBar;
