import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '@/components/ui';
import { useSignUpForm } from './use-sign-up-form';

export const SignUpForm = () => {
	const { form, onSubmit } = useSignUpForm();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className={'space-y-6 px-2'}>
				<FormField
					name={'firstName'}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'firstName'}>First name</FormLabel>
							<FormControl>
								<Input {...field} id={'firstName'} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name={'lastName'}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'lastName'}>Last name</FormLabel>
							<FormControl>
								<Input {...field} id={'lastName'} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name={'email'}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'email'}>Email</FormLabel>
							<FormControl>
								<Input {...field} id={'email'} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					name={'password'}
					control={form.control}
					render={({ field }) => (
						<FormItem>
							<FormLabel htmlFor={'password'}>Password</FormLabel>
							<FormControl>
								<Input {...field} id={'password'} type={'password'} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className={'flex justify-end'}>
					<Button
						type={'submit'}
						className={'h-10 w-32'}
						isLoading={form.formState.isSubmitting}
					>
						Sign up
					</Button>
				</div>
			</form>
		</Form>
	);
};
