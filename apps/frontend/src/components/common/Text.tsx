import { cva } from 'class-variance-authority';
import React from 'react';

import { cn } from '@/libs/utils';

export const defaultVariantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  'sub-24': 'p',
  'sub-20': 'p',
  'p-b': 'p',
  'p-m': 'p',
  'p-s': 'p',
  'p-xs': 'p',
  'p-xxs': 'p',
  'link-m': 'a',
  'link-s': 'a',
  'cap-xl': 'span',
  'cap-l': 'span',
  'cap-m': 'span',
  'cap-s': 'span',
  inherit: 'p',
};

const textVariants = cva('', {
  variants: {
    variant: {
      h1: 'text-8xl leading-[110%]',
      h2: 'text-7xl leading-[110%]',
      h3: 'text-6xl leading-[120%]',
      h4: 'text-[2.5rem] leading-[120%]',
      h5: 'text-[2rem] leading-[140%]',
      'sub-24': 'text-2xl leading-[130%]',
      'sub-20': 'text-xl leading-[130%]',
      'p-b': 'text-lg leading-[160%]',
      'p-m': 'text-base leading-[160%]',
      'p-s': 'text-sm leading-[170%]',
      'p-xs': 'text-xs leading-[170%]',
      'p-xxs': 'text-[10px] leading-[170%]',
      'link-m': 'leading-[150%] underline',
      'link-s': 'text-sm leading-[110%] underline',
      'cap-xl': 'text-xl uppercase leading-[140%] tracking-[6%]',
      'cap-l': 'text-base uppercase leading-[140%] tracking-[6%]',
      'cap-m': 'text-sm uppercase leading-[140%] tracking-[6%]',
      'cap-s': 'text-xs uppercase leading-[120%] tracking-[4%]',
      inherit: '',
    },
    align: {
      inherit: '',
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
      justify: 'text-justify',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'p-b',
    align: 'inherit',
    weight: 'medium',
  },
});

type TextProps<C extends React.ElementType> = {
  as?: C;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  weight?: 'normal' | 'bold' | 'semibold' | 'medium';
  className?: string;
  gutterBottom?: boolean;
  noWrap?: boolean;
  paragraph?: boolean;
  variant?: keyof typeof defaultVariantMapping;
  variantMapping?: typeof defaultVariantMapping;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<C>;

const Text = <C extends React.ElementType>({
  as,
  align = 'inherit',
  weight,
  className,
  paragraph = false,
  variant = 'p-m',
  variantMapping = defaultVariantMapping,
  children,
  ...restProps
}: TextProps<C>) => {
  const Component = as || (paragraph ? 'p' : variantMapping[variant] || defaultVariantMapping[variant]) || 'span';

  return (
	<Component className={cn(textVariants({ align, variant, weight }), className)} {...restProps}>
		{' '}
		{children}{' '}
	</Component>
  );
};

Text.displayName = 'Text';

export { Text };
