import { API } from '@/libs/api';
import { useAuth } from '@/libs/contexts';
import { toastWrapper } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	ApiPath,
	AuthApiPath,
	type ISignInResponse,
} from '@skill-sphere/shared';
import type { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { signInFormDefaults, signInFormSchema } from '../../libs';

export const useSignInForm = () => {
	const form = useForm({
		resolver: zodResolver(signInFormSchema),
		defaultValues: signInFormDefaults,
	});
	const { initializeUser } = useAuth();
	const navigate = useNavigate();

	const onSubmit = form.handleSubmit((values) => {
		API.post(`${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`, values)
			.then((res: AxiosResponse<ISignInResponse>) => {
				toastWrapper('Signed in successfully', 'success');
				initializeUser(res.data.user);
				navigate('/');
			})
			.catch(
				({
					message,
					data,
				}: {
					message: string;
					data?: { [P in keyof typeof signInFormDefaults]: string };
				}) => {
					toastWrapper(message, 'error');
					if (data) {
						Object.entries(data).forEach(([key, value]) => {
							form.setError(key as keyof typeof signInFormDefaults, {
								message: value,
							});
						});
					}
				},
			);
	});

	return {
		form,
		onSubmit,
	};
};
