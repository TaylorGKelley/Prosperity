'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{
		title: 'Overview',
		url: '/',
	},
	{
		title: 'Transactions',
		url: '/transactions',
	},
	{
		title: 'Budget',
		url: '/budget',
	},
];

export default function Navbar() {
	const pathname = usePathname();

	return (
		<header className='flex justify-between items-center px-10 py-12'>
			<div className='flex gap-3 items-center text-3xl font-bold'>
				<Image src='/logo.svg' height={32} width={32} alt='Budget Logo' />
				<span>Prosperity</span>
			</div>
			<nav>
				<ul className='flex items-center gap-12'>
					{links.map((link) => (
						<li
							key={link.url}
							className={cn('font-medium', {
								'text-black': link.url === pathname,
								'text-gray-500': link.url !== pathname,
							})}>
							<Link href={link.url}>{link.title}</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
