'use client';

import * as React from 'react';

import { SidebarLogo } from '@/components/SidebarLogo';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { Home, type LucideProps, PieChart, Wallet } from 'lucide-react';

type NavGroup = {
	groupName: string;
	title?: string;
	items: {
		Icon: React.ForwardRefExoticComponent<
			Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
		>;
		title: string;
		url: string;
	}[];
};

const data = {
	navMain: [
		{
			groupName: 'Main Links',
			items: [
				{
					Icon: Home,
					title: 'Home',
					url: '/',
				},
				{
					Icon: PieChart,
					title: 'Budget',
					url: '/budget',
				},
				{
					Icon: Wallet,
					title: 'Wallet',
					url: '/wallet',
				},
			],
		},
	] as NavGroup[],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const pathname = usePathname();

	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<SidebarLogo />
			</SidebarHeader>
			<SidebarContent>
				{/* We create a SidebarGroup for each parent. */}
				{data.navMain.map((item) => (
					<SidebarGroup key={item.groupName}>
						{item.title && <SidebarGroupLabel>{item.title}</SidebarGroupLabel>}
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild isActive={pathname === item.url}>
											<a href={item.url} className='flex gap-4'>
												<item.Icon className='size-4' />
												<span>{item.title}</span>
											</a>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}
