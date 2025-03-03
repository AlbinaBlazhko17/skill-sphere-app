import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signUpFormDefaults, signUpFormSchema } from '../../libs';
import { API } from '@/libs/api';
import { ApiPath } from '@skill-sphere/shared';
import { toast } from 'sonner';

export const useSignUpForm = () => {
  const form = useForm({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpFormDefaults,
  });

  const onSubmit = form.handleSubmit((values) => {
    toast('Account created successfully');
    // API.post(`${ApiPath.AUTH}/sign-up`, values).then(() => {

    // });
  });

  return {
    form,
    onSubmit,
  };
};
