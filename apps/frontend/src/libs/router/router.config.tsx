import { createBrowserRouter } from 'react-router';
import { AppLayout, PlainLayout, ProtectedLayout } from '@/components/layout';
import Home from '@/pages/Home';
import SignUpPage from '@/pages/SignUpPage';
import SignInPage from '@/pages/SignInPage';
import { PersonalProfilePage } from '@/pages/PersonalProfilePage';

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
				element: <AppLayout />,
				children: [
					{
						path: '/',
						element: <Home />,
					},
					{
						path: '/me',
						element: <PersonalProfilePage />,
					},
				],
			},
		],
	},
]);
