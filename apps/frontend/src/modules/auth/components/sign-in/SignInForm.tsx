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
import { useSignInForm } from './use-sign-in-form';

export const SignInForm = () => {
	const { form, onSubmit } = useSignInForm();

	return (
		<Form {...form}>
			<form onSubmit={onSubmit} className={'space-y-6 px-2'}>
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
						Sign in
					</Button>
				</div>
			</form>
		</Form>
	);
};
