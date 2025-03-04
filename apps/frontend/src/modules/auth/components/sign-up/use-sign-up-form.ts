import { API } from '@/libs/api';
import { toastWrapper } from '@/libs/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApiPath, AuthApiPath } from '@skill-sphere/shared';
import { useForm } from 'react-hook-form';
import { signUpFormDefaults, signUpFormSchema } from '../../libs';

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaults,
  });

  const onSubmit = form.handleSubmit((values) => {
    API.post(`${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`, values)
      .then(() => {
        toastWrapper('Account created successfully', 'success');
      })
      .catch(({ message, data }: { message: string; data?: { [P in keyof typeof signUpFormDefaults]: string } }) => {
        toastWrapper(message, 'error');
        if (data) {
          Object.entries(data).forEach(([key, value]) => {
            form.setError(key as keyof typeof signUpFormDefaults, { message: value });
          });
        }
      });
  });

  return {
    form,
    onSubmit,
  };
};
