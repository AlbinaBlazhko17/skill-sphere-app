import { Outlet } from 'react-router';
import { AppSidebar } from './AppSidebar';
import { SidebarTrigger } from '../ui';

export const AppLayout = () => {
	return (
		<div className="flex flex-1">
			<AppSidebar />
			<main className="relative flex grow flex-col p-6">
				<SidebarTrigger />
				<Outlet />
			</main>
		</div>
	);
};
