import { Icon } from '@/components/common';
import { toast, type ToasterProps } from 'sonner';

export const toastWrapper = (
  message: string,
  type: 'success' | 'error' | 'info' | 'warning',
  options?: ToasterProps
) => {
  toast[type](message, {
    cancel: {
      label: <Icon name={'X'} className={'size-4'} />,
      onClick: () => toast.dismiss(),
    },
    ...options,
  });
};
