import { useAuth } from '@/libs/contexts';
import { Outlet, useNavigate, useLocation } from 'react-router';

import { useEffect } from 'react';

export const ProtectedLayout = () => {
	const { isAuthenticated, isLoading } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (!isAuthenticated && !isLoading) {
			navigate('/sign-in');
		} else if (
			isAuthenticated &&
			(location.pathname === '/sign-in' || location.pathname === '/sign-up')
		) {
			navigate('/');
		}
	}, [isAuthenticated, isLoading, navigate, location.pathname]);

	if (
		!isAuthenticated &&
		location.pathname !== '/sign-in' &&
		location.pathname !== '/sign-up'
	) {
		return null;
	}

	return <Outlet />;
};
