import { API } from '@/libs/api';
import { useAuth } from '@/libs/contexts';
import { toastWrapper } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiPath } from '@skill-sphere/shared';
import { useForm } from 'react-hook-form';
import { ChangePasswordFormDefaults, changePasswordSchema } from '../../libs';

export const useChangePassword = () => {
	const { user } = useAuth();

	const form = useForm({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: ChangePasswordFormDefaults,
	});

	const onSubmit = form.handleSubmit((data) => {
		API.post(`${ApiPath.USERS}/${user?.id}/change-password`, {
			oldPassword: data.currentPassword,
			newPassword: data.newPassword,
		})
			.then((res) => {
				toastWrapper('Password changed successfully', 'success');
				form.reset();
			})
			.catch(
				({
					message,
					data,
				}: {
					message: string;
					data?: { [P in keyof typeof ChangePasswordFormDefaults]: string };
				}) => {
					toastWrapper(message, 'error');
					if (data) {
						Object.entries(data).forEach(([key, value]) => {
							form.setError(key as keyof typeof ChangePasswordFormDefaults, {
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
