import { Link } from 'react-router';
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	useSidebar,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarFooter,
} from '../ui';
import { Icon, Text } from '../common';
import { useAuth } from '@/libs/contexts';

export const AppSidebar = () => {
	const { open } = useSidebar();
	const { user } = useAuth();

	return (
		<Sidebar collapsible={'icon'}>
			<SidebarHeader>
				<div className="mx-auto">
					<Link to="/" className="p-0">
						{open ? (
							<Icon name="Logo" className="h-fit w-32" />
						) : (
							<Icon name={'LogoIcon'} className="h-12 w-fit" />
						)}
					</Link>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup className={'mt-3'}>
					<SidebarGroupLabel className={'mx-auto'}>Pages</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu className="mt-3 border-none">
							<SidebarMenuItem className={'w-full'}>
								<SidebarMenuButton size={'lg'}>
									<Link
										to="/"
										className={'flex grow items-center justify-center gap-2'}
									>
										<Icon
											name="Home"
											className={open ? 'size-7' : 'size-[31px]'}
										/>
										<Text variant={'p-b'} as={'span'}>
											Home
										</Text>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className={'pb-6'}>
				<SidebarMenu className="mt-3 border-none">
					<SidebarMenuItem className={'w-full'}>
						<SidebarMenuButton size={'lg'} className={'w-full px-1'}>
							<Link to={'/me'} className={'flex items-center gap-2'}>
								{user?.imageUrl ? (
									<img
										src={user?.imageUrl}
										alt={user?.email}
										className={`${open ? 'size-7' : 'size-[31px]'} max-w-[31px] overflow-hidden rounded-full border-2 border-violet-400 object-cover`}
									/>
								) : (
									<Icon
										name={'UserCircle2'}
										className={open ? 'size-7' : 'size-[31px]'}
									/>
								)}
								<Text variant={'p-b'} as={'span'} className={'mx-auto'}>
									{user?.email}
								</Text>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
};
