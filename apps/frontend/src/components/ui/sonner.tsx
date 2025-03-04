import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast:
						'group toast group-[.toaster]:!bg-violet-50 group-[.toaster]:!text-violet-950 group-[.toaster]:!border-violet-800 group-[.toaster]:!shadow-md',
					description: 'group-[.toast]:text-muted-foreground',
					actionButton:
						'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
					cancelButton:
						'group-[.toast]:!bg-violet-50 group-[.toast]:!text-violet-950 font-medium',
					icon: 'group-data-[type=error]:text-red-500 group-data-[type=success]:text-green-500',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
