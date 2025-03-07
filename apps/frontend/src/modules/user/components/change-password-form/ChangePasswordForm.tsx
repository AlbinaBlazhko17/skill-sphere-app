import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	Input,
	Button,
	FormMessage,
} from '@/components/ui';
import { useChangePassword } from './use-change-password';

export const ChangePasswordForm = () => {
	const { form, onSubmit } = useChangePassword();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className={'space-y-6'}>
				<FormField
					control={form.control}
					name="currentPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'currentPassword'}>
								Current password
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									id={'currentPassword'}
									autoComplete={'current-password'}
									type={'password'}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'newPassword"'}>New password</FormLabel>
							<FormControl>
								<Input {...field} id={'newPassword"'} type={'password'} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="newPasswordConfirm"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'newPasswordConfirm"'}>
								New password confirmation
							</FormLabel>
							<FormControl>
								<Input
									{...field}
									id={'newPasswordConfirm"'}
									type={'password'}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{form.formState.isDirty && (
					<div className={'flex justify-end'}>
						<Button
							type={'submit'}
							className={'h-10 w-32'}
							isLoading={form.formState.isSubmitting}
						>
							Save
						</Button>
					</div>
				)}
			</form>
		</Form>
	);
};
