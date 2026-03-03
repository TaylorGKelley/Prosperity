'use client';

import * as React from 'react';
import { Banknote } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';

export function SidebarLogo() {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<SidebarMenuButton size='lg'>
					<Link href='/' className='flex gap-3'>
						<div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
							<Banknote className='size-4' />
						</div>
						<div className='flex flex-col gap-0.5 leading-none'>
							<span className='text-md font-semibold'>Prosperity</span>
							<span className='text-xs'>Your finance portal</span>
						</div>
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
