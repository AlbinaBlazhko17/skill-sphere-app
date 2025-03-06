import { Text } from '@/components/common';
import { ImageUploader } from '../image-uploader';
import { PersonalProfileForm } from '../personal-profile-form';
import { Card } from '@/components/ui';
import { useAuth } from '@/libs/contexts';
import { API } from '@/libs/api';
import { ApiPath, type IUserResponse } from '@skill-sphere/shared';

export const PersonalProfile = () => {
	const { user, setUser } = useAuth();

	const onImageUpload = async (file: File) => {
		const formData = new FormData();
		formData.append('file', file);

		const res = await API.post(
			`${ApiPath.USERS}/${user?.id}/upload-avatar`,
			formData,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			},
		);

		setUser(res.data);
	};

	const onImageDelete = async () => {
		await API.delete(`${ApiPath.USERS}/${user?.id}/avatar`);

		setUser?.((prevUser: IUserResponse | null) => {
			if (prevUser) {
				return { ...prevUser, imageUrl: '' };
			}
			return null;
		});
	};

	return (
		<div className={'flex flex-col gap-10'}>
			<Text as={'h1'} variant={'h4'} className={'text-center'}>
				Personal Profile
			</Text>
			<Card className={'w-1/2 px-6 shadow-sm'}>
				<ImageUploader
					initialImage={user?.imageUrl || ''}
					onImageUpload={onImageUpload}
					onImageDelete={onImageDelete}
				/>
				<PersonalProfileForm />
			</Card>
		</div>
	);
};
