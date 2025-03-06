import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	Input,
	Button,
} from '@/components/ui';
import { usePersonalProfileForm } from './use-personal-profile-form';

export const PersonalProfileForm = () => {
	const { form, onSubmit } = usePersonalProfileForm();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className={'space-y-6'}>
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'firstName'}>First name</FormLabel>
							<FormControl>
								<Input {...field} id={'firstName'} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'lastName'}>Last name</FormLabel>
							<FormControl>
								<Input {...field} id={'lastName'} />
							</FormControl>
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'email'}>Email</FormLabel>
							<FormControl>
								<Input {...field} id={'email'} />
							</FormControl>
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
