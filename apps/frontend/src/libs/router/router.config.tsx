import { createBrowserRouter } from 'react-router';
import Home from '@/pages/Home';
import { SignUpPage } from '@/pages/SignUpPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
]);
