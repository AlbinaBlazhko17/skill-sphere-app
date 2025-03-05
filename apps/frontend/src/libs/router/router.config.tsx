import { createBrowserRouter } from 'react-router';
import { PlainLayout, ProtectedLayout } from '@/components/common';
import Home from '@/pages/Home';
import SignUpPage from '@/pages/SignUpPage';
import SignInPage from '@/pages/SignInPage';

export const router = createBrowserRouter([
	{
		element: <ProtectedLayout />,
		children: [
			{
				element: <PlainLayout />,
				children: [
					{
						path: '/sign-up',
						element: <SignUpPage />,
					},
					{
						path: '/sign-in',
						element: <SignInPage />,
					},
				],
			},
			{
				path: '/',
				element: <Home />,
			},
		],
	},
]);
