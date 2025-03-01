import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '@/libs/router/router.config';
import { Toaster } from '@/components/ui';

import '@/libs/styles/styles.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster />
	</StrictMode>
);
