import { Outlet } from 'react-router';
import { AppSidebar } from './AppSidebar';
import { SidebarTrigger } from '../ui';

export const AppLayout = () => {
	return (
		<div className="flex flex-1">
			<AppSidebar />
			<main className="relative flex grow flex-col p-10">
				<SidebarTrigger className={'absolute top-5 left-5'} />
				<Outlet />
			</main>
		</div>
	);
};
