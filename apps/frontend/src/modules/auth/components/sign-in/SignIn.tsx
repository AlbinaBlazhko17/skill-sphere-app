import { Text } from '@/components/common';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { Link } from 'react-router';
import { SignInForm } from './SignInForm';

export const SignIn = () => {
	return (
		<Card
			className={'w-screen sm:w-[65vw] lg:w-[60vw] xl:w-[40vw] 2xl:w-[30vw]'}
		>
			<CardHeader className={'px-2'}>
				<Text as={'h1'} variant={'h5'} align={'center'}>
					Sign in
				</Text>
				<Text variant={'p-m'} className={'text-center'}>
					Don't have an account?{' '}
					<Link to={'/sign-up'} className={'text-cyan-400'}>
						{' '}
						Sign up
					</Link>
				</Text>
			</CardHeader>
			<CardContent>
				<SignInForm />
			</CardContent>
		</Card>
	);
};
