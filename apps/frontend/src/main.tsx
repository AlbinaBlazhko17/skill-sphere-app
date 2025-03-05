import { SidebarProvider, Toaster } from '@/components/ui';
import { router } from '@/libs/router/router.config';
import AuthProvider from '@/libs/contexts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import '@/libs/styles/styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SidebarProvider>
			<AuthProvider>
				<Toaster />
				<RouterProvider router={router} />
			</AuthProvider>
		</SidebarProvider>
	</StrictMode>,
);
