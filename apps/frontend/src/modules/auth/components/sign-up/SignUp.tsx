import { Text } from '@/components/common';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { Link } from 'react-router';
import { SignUpForm } from './SignUpForm';

export const SignUp = () => {
  return (
    <Card className={'2xl:w-[30vw] xl:w-[40vw] lg:w-[60vw] sm:w-[65vw] w-screen'}>
      <CardHeader className={'px-2'}>
        <Text as={'h1'} variant={'h5'} align={'center'}>
          Sign up
        </Text>
        <Text variant={'p-m'} className={'text-center'}>
          Already have an account?{' '}
          <Link to={'/sign-in'} className={'text-cyan-400'}>
            {' '}
            Sign in
          </Link>
        </Text>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  );
};
