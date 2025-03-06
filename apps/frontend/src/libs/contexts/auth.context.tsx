import {
	createContext,
	useContext,
	useEffect,
	useState,
	type Dispatch,
	type SetStateAction,
} from 'react';
import { API } from '../api';
import {
	ApiPath,
	AuthApiPath,
	UserApiPath,
	type IUserResponse,
	type IUserResponseWithToken,
} from '@skill-sphere/shared';
import { StorageKeys } from '../enums';
import { toastWrapper } from '../utils';

interface AuthContext {
	isAuthenticated: boolean;
	isLoading: boolean;
	user: IUserResponse | null;
	initializeUser: (user: IUserResponseWithToken) => void;
	logout: () => void;
	setUser: Dispatch<SetStateAction<IUserResponse | null>>;
}

const AuthContext = createContext<AuthContext>({
	isAuthenticated: false,
	isLoading: false,
	user: null,
	initializeUser: () => {},
	logout: () => {},
	setUser: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [user, setUser] = useState<IUserResponse | null>(null);

	const initializeUser = (user: IUserResponseWithToken) => {
		localStorage.setItem(StorageKeys.AUTH_TOKEN, user.token);
		setUser({
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			imageUrl: user.imageUrl,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		});
	};

	const logout = () => {
		API.post(`${ApiPath.AUTH}${AuthApiPath.LOGOUT}`).then(() => {
			localStorage.removeItem(StorageKeys.AUTH_TOKEN);
			setUser(null);
			setIsLoading(false);
		});
	};

	useEffect(() => {
		const token = localStorage.getItem(StorageKeys.AUTH_TOKEN);
		if (token) {
			API.get(`${ApiPath.USERS}${UserApiPath.ME}`)
				.then((res) => {
					setUser(res.data);
				})
				.catch(() => {})
				.finally(() => {
					setIsLoading(false);
				});
		} else {
			toastWrapper('Please sign in to continue', 'info');
		}
	}, []);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: !!user,
				isLoading,
				user,
				initializeUser,
				logout,
				setUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
