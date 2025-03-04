import { API } from '@/libs/api';
import { toastWrapper } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiPath, AuthApiPath } from '@skill-sphere/shared';
import { useForm } from 'react-hook-form';
import { signInFormDefaults, signInFormSchema } from '../../libs';
import { useState } from 'react';

export const useSignInForm = () => {
	const form = useForm({
		resolver: zodResolver(signInFormSchema),
		defaultValues: signInFormDefaults,
	});

	const onSubmit = form.handleSubmit((values) => {
		API.post(`${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`, values)
			.then(() => {
				toastWrapper('Signed in successfully', 'success');
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
