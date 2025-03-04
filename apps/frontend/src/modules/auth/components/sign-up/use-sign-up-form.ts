import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpFormDefaults, signUpFormSchema } from '../../libs';
import { API } from '@/libs/api';
import { ApiPath, AuthApiPath } from '@skill-sphere/shared';
import { toast } from 'sonner';

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaults,
  });

  const onSubmit = form.handleSubmit((values) => {
    API.post(`${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`, values)
      .then(() => {
        toast('Account created successfully');
      })
      .catch(({ message, data }: { message: string; data?: { [P in keyof typeof signUpFormDefaults]: string } }) => {
        toast(message);
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
