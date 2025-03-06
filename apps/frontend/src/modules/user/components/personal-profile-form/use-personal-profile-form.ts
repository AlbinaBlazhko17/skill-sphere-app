import { API } from '@/libs/api';
import { useAuth } from '@/libs/contexts';
import { toastWrapper } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiPath, UserApiPath } from '@skill-sphere/shared';
import { useForm } from 'react-hook-form';
import { PERSONAL_PROFILE_DEFAULTS, personalProfileSchema } from '../../libs';

export const usePersonalProfileForm = () => {
	const { user } = useAuth();
	const form = useForm({
		defaultValues: PERSONAL_PROFILE_DEFAULTS,
		resolver: zodResolver(personalProfileSchema),
		values: {
			firstName: user?.firstName || '',
			lastName: user?.lastName || '',
			email: user?.email || '',
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		API.patch(`${ApiPath.USERS}/${user?.id}`, data)
			.then((res) => {
				form.reset({
					firstName: res.data.firstName,
					lastName: res.data.lastName,
					email: res.data.email,
				});
				toastWrapper('Profile updated successfully', 'success');
			})
			.catch(() => {
				toastWrapper('Profile update failed', 'error');
			});
	});

	return {
		form,
		onSubmit,
	};
};
